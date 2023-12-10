import React, { useEffect, useState } from "react";
import { Link, useAsyncError, useNavigate, useParams } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl";
import { QuizProgressmodal } from "../components/Modal/QuizProgressmodal";
import { QuizResultModal } from "../components/Modal/QuizResultModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export const QuizPage = () => {
	const [quiz, setQuiz] = useState([]);
	const [isResultOpen, setResultOpen] = useState(false);
	const [quizResult, setQuizResult] = useState([]);
	const [isBack, setIsBack] = useState(false);
	const [isQuizResultOpen, setQuizResultOpen] = useState(false);
	const [quizInfo, setQuizInfo] = useState([]);
	const [quizData, setQuizData] = useState([]);
	const history = useNavigate();

	// Maintain an array of selected choice indexes, one for each question
	const [selectedChoiceIndexes, setSelectedChoiceIndexes] = useState(
		Array(quiz.length).fill(null),
	);

	const { id } = useParams();
	const items = quiz.length;

	const handlebackButton = () => {
		setIsBack(true);
	};

	const handleRadioChange = (questionIndex, choiceIndex) => {
		setQuizData((prevData) => {
			const existingQuestionIndex = prevData.findIndex(
				(data) => data.questionIndex === questionIndex,
			);

			if (existingQuestionIndex !== -1) {
				const newData = [...prevData];
				newData[existingQuestionIndex].choiceIndex = choiceIndex;
				return newData;
			} else {
				return [
					...prevData,
					{ questionIndex, choiceIndex, quest_id: quiz[questionIndex].quest_id },
				];
			}
		});
	};

	const getQuizInfo = async () => {
		try {
			let response = await fetch(buildUrl(`/course/quiz/get-info/${id}`), {
				method: "GET",
			});
			if (!response.ok) {
				toast.error("Internal server error");
			} else {
				const data = await response.json();
				setQuizInfo(data.quizInfo);
			}
		} catch (err) {
			toast.info("There was a problem fetching quizzes, please try again later");
		}
	};

	const handleQuestions = async () => {
		try {
			let response = await fetch(buildUrl(`/course/get-quiz-questions/${id}`), {
				method: "GET",
			});
			if (!response.ok) {
				toast.error("Internal server error");
			} else {
				const data = await response.json();
				setQuiz(data.questionsResults);
			}
		} catch (err) {
			toast.info("There was a problem fetching questions, please try again later");
		}
	};

	// for the progress modal
	const onProgressChange = (value) => {
		if (value === true) {
			setIsBack(false);
		} else {
			history(-1);
		}
	};

	// for the result modal
	const onResultChange = (value) => {
		if (value === true) {
			setQuizResultOpen(false);
			window.location.reload();
		} else {
			history(-1);
		}
	};

	const user_id = localStorage.getItem("user_id");

	const handleCheckAnswer = async (e) => {
		e.preventDefault();
		setQuizResultOpen(true);
		try {
			let response = await fetch(buildUrl("/course/quiz/check-quiz"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id,
					quizData,
					user_id,
					quiz_name: quizInfo?.quiz_name,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				setQuizResult(data);
			} else {
				console.log("Internal server error");
			}
		} catch (err) {
			toast.info("There was a problem checking your quiz, please try again later");
		}
	};

	useEffect(() => {
		getQuizInfo();
		handleQuestions();
	}, []);

	return (
		<>
			<div className="bg-[#fafafa] h-screen">
				<ToastContainer autoClose={2000} />
				<div className="mx-10 md:mx-32 lg:mx-72 py-10">
					{isBack ? (
						<QuizProgressmodal
							onProgressChange={(value) => onProgressChange(value)}
						/>
					) : (
						""
					)}
					{isQuizResultOpen ? (
						<QuizResultModal
							onResultChange={(value) => onResultChange(value)}
							quizResult={quizResult}
							items={items}
						/>
					) : (
						""
					)}
					<div>
						<div className="flex">
							<div
								onClick={handlebackButton}
								className="bg-gradient-to-r from-indigo-600 from-10% via-[rgb(111,93,192)] via-30% to-[rgb(173,125,193)] to-90% text-white flex items-center justify-center px-4 h-8 rounded cursor-pointer text-xs">
								Back
							</div>
						</div>
						<div className="mt-5 text-sm space-y-1">
							<h1>Quiz: {quizInfo?.quiz_name}</h1>
							<p>Items: {items}</p>
							<p>
								By: {quizInfo?.first_name} {quizInfo?.last_name}
							</p>
						</div>
						{quiz.map((question, questionIndex) => (
							<div
								key={questionIndex}
								className="pt-5 bg-white border border-gray-200 my-5 p-5 rounded">
								<h1 className="text-sm text-gray-500 font-medium">
									Question {questionIndex + 1}: &nbsp;
									{question.question}
								</h1>
								<div>
									{question.choices.map((choice, choiceIndex) => (
										<label
											key={choiceIndex}
											className=" bg-white border border-gray-100 p-2 px-4 my-2 h-8 rounded flex items-center cursor-pointer hover:bg-gray-300">
											<input
												type="radio"
												name={`choices_${questionIndex}`}
												checked={quizData.some(
													(data) =>
														data.questionIndex === questionIndex &&
														data.choiceIndex === choiceIndex,
												)}
												onChange={() => handleRadioChange(questionIndex, choiceIndex)}
											/>
											<span className="text-xs"> &nbsp; {choice}</span>
										</label>
									))}
								</div>
							</div>
						))}
					</div>
					<div className="flex justify-end pt-10">
						<button
							onClick={handleCheckAnswer}
							className="bg-gradient-to-r from-indigo-600 from-10% via-[rgb(111,93,192)] via-30% to-[rgb(173,125,193)] to-90% text-white flex items-center justify-center px-4 h-8 rounded cursor-pointer text-xs">
							Submit
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
