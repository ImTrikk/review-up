import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl";
import { QuizProgressmodal } from "../components/Modal/QuizProgressmodal";

export const QuizPage = () => {
	const [quiz, setQuiz] = useState([]);
	const [isResultOpen, setResultOpen] = useState(false);
	const [isBack, setIsBack] = useState(false);

	// Maintain an array of selected choice indexes, one for each question
	const [selectedChoiceIndexes, setSelectedChoiceIndexes] = useState([]);

	const { id } = useParams();

	const history = useNavigate();

	const items = quiz.length;

	const handlebackButton = () => {
		setIsBack(true);
	};

	const handleRadioChange = (questionIndex, choiceIndex) => {
		// Copy the current array and update the selected index for the specific question
		const newSelectedChoiceIndexes = [...selectedChoiceIndexes];
		newSelectedChoiceIndexes[questionIndex] = choiceIndex;
		setSelectedChoiceIndexes(newSelectedChoiceIndexes);
		console.log("Selected choice: ", selectedChoiceIndexes);
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
				setQuiz(data.questionsResults);
				console.log(data);
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

	const handleCheckAnswer = async () => {};

	useEffect(() => {
		handleQuestions();
	}, []);

	return (
		<>
			<div className="bg-[#fafafa]">
				<div className="mx-72 py-10">
					{isBack ? (
						<QuizProgressmodal
							onProgressChange={(value) => onProgressChange(value)}
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
							<h1>Quiz: </h1>
							<p>Items: {items}</p>
							<p>By: </p>
						</div>
						{quiz.map((question, questionIndex) => (
							<div
								key={questionIndex}
								className="pt-5 bg-white border border-gray-200 my-5 p-5 rounded">
								<div className="bg-gradient-to-r from-indigo-600 from-10% via-[rgb(111,93,192)] via-30% to-[rgb(173,125,193)] to-90% text-white text-sm p-2 rounded">
									<h1>
										Question No.{questionIndex + 1}: &nbsp; {question?.question}?
									</h1>
								</div>
								<div>
									{question.choices.map((choice, choiceIndex) => (
										<label
											key={choiceIndex}
											className=" bg-white border border-gray-100 p-2 px-4 my-2 h-8 rounded flex items-center cursor-pointer hover:bg-gray-300">
											<input
												type="radio"
												name={`choices_${questionIndex}`}
												checked={selectedChoiceIndexes[questionIndex] === choiceIndex}
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
						<button className="bg-gradient-to-r from-indigo-600 from-10% via-[rgb(111,93,192)] via-30% to-[rgb(173,125,193)] to-90% text-white flex items-center justify-center px-4 h-8 rounded cursor-pointer text-xs">
							Submit
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
