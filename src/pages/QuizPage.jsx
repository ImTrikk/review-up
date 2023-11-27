import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl";

export const QuizPage = () => {
	const [quiz, setQuiz] = useState([]);
	const [choices, setChoices] = useState([]);
	const [isResultOpen, setResultOpen] = useState(false);

	const { id } = useParams();

	const getQuiz = async () => {
		try {
			let response = await fetch(buildUrl(`/quiz-info/${id}`), {
				method: "GET",
			});
			if (response.ok) {
				const data = await response.json();
				setQuiz(data.questionsResults);
			} else {
				console.log("Internal server error");
			}
		} catch (err) {
			console.log(first);
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
				setQuiz(data.questionsResults);
				console.log(data);
				setChoices(data.questionsResults);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleCheckAnswer = async () => {};

	useEffect(() => {
		handleQuestions();
	}, []);

	return (
		<>
			<div className="mx-32 my-10">
				<div>
					<div className="flex">
						<Link>
							<div className="bg-gradient-to-r from-indigo-600 from-10% via-[rgb(111,93,192)] via-30% to-[rgb(173,125,193)] to-90% text-white flex items-center justify-center px-4 h-8 rounded text-xs">
								Back
							</div>
						</Link>
					</div>
					<div className="mt-5">
						<h1>Quiz: </h1>
						<p>By: </p>
					</div>
					{quiz.map((question, index) => (
						<div key={index} className="">
							<div>Question No. {index + 1}</div>
							<h1>Question: {question?.question}</h1>
							<div>
								{question.choices.map((choice, choiceIndex) => (
									<div key={choiceIndex} className="">
										Choice: {choice}
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
