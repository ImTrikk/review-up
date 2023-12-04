import React, { useEffect, useState } from "react";
import { Link, useAsyncError, useNavigate, useParams } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl";
import { QuizProgressmodal } from "../components/Modal/QuizProgressmodal";
import { QuizResultModal } from "../components/Modal/QuizResultModal";

export const QuizPage = () => {
	const [quiz, setQuiz] = useState([]);
	const [isResultOpen, setResultOpen] = useState(false);
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

	// const handleRadioChange = (questionIndex, choiceIndex) => {
	// 	setQuizData((prevData) => {
	// 		const existingQuestionIndex = prevData.findIndex(
	// 			(data) => data.questionIndex === questionIndex,
	// 		);

	// 		if (existingQuestionIndex !== -1) {
	// 			const newData = [...prevData];
	// 			newData[existingQuestionIndex].choiceIndex = choiceIndex;
	// 			return newData;
	// 		} else {
	// 			return [...prevData, { questionIndex, choiceIndex }];
	// 		}
	// 	});
	// };

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

	useEffect(() => {
		console.log("Quiz data: ", quizData);
	}, [quizData]);

	const getQuizInfo = async () => {
		console.log("running test");
		console.log(id);
		try {
			let response = await fetch(buildUrl(`/course/quiz/get-info/${id}`), {
				method: "GET",
			});
			if (!response.ok) {
				console.log("Internal server error");
			} else {
				const data = await response.json();
				setQuizInfo(data.quizInfo);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleQuestions = async () => {
		try {
			let response = await fetch(buildUrl(`/course/get-quiz-questions/${id}`), {
				method: "GET",
			});
			if (!response.ok) {
				console.log("Internal server error");
			} else {
				const data = await response.json();
				console.log(data.questionsResults);
				setQuiz(data.questionsResults);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const onProgressChange = (value) => {
		if (value === true) {
			setIsBack(false);
		} else {
			history(-1);
		}
	};

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
				}),
			});

			const data = await response.json();
			console.log(data);
			if (response.ok) {
				// setQuizData(data);
			} else {
				console.log("Internal server error");
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getQuizInfo();
		handleQuestions();
	}, []);

	return (
		<>
			<div className="bg-[#fafafa]">
				<div className="mx-10 md:mx-32 lg:mx-72 py-10">
					{isBack ? (
						<QuizProgressmodal
							onProgressChange={(value) => onProgressChange(value)}
						/>
					) : (
						""
					)}
					{isQuizResultOpen ? <QuizResultModal /> : ""}
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
								{/* ... */}
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
