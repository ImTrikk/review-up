import { useState, useEffect } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

export const QuizModal = ({ onChangeQuestions, onChangeQuizName }) => {
	const [quizName, setQuizName] = useState("");
	const [questions, setQuestions] = useState([
		{
			id: 1,
			question: "",
			choices: ["", "", "", ""],
			correctAnswer: 0,
		},
	]);

	const addQuestion = (e) => {
		e.preventDefault();
		setQuestions((prevQuestions) => [
			...prevQuestions,
			Object.create(Object.prototype, {
				id: { value: prevQuestions.length + 1, enumerable: true },
				question: { value: "", id: true },
				choices: { value: ["", "", "", ""], enumerable: true },
				correctAnswer: { value: null, enumerable: true },
			}),
		]);
	};

	const updateQuestion = (index, field, value) => {
		setQuestions((prevQuestions) => {
			const newQuestions = [...prevQuestions];
			newQuestions[index] = {
				...newQuestions[index],
				[field]: value,
			};
			return newQuestions;
		});
	};

	const updateChoice = (questionIndex, choiceIndex, value) => {
		setQuestions((prevQuestions) => {
			const newQuestions = [...prevQuestions];
			newQuestions[questionIndex] = {
				...newQuestions[questionIndex],
				choices: newQuestions[questionIndex].choices.map((choice, index) =>
					index === choiceIndex ? value : choice,
				),
			};
			return newQuestions;
		});
	};

	const updateCorrectAnswer = (questionIndex, value) => {
		setQuestions((prevQuestions) => {
			const newQuestions = [...prevQuestions];
			newQuestions[questionIndex] = {
				...newQuestions[questionIndex],
				correctAnswer: value,
			};
			return newQuestions;
		});
	};

	useEffect(() => {
		// This will be called after the component has rendered
		onChangeQuestions(questions);
	}, [questions, onChangeQuestions]);

	return (
		<>
			<div className="pt-8">
				<div className="border border-primaryColor shadow rounded p-5">
					<h1 className="text-primaryColor text-xs">
						Practice quiz for this module
					</h1>
					<div>
						<div className="pt-5">
							<div className="flex gap-2 items-center">
								<label htmlFor="" className="text-xs text-gray-500">
									Quiz Name:{" "}
								</label>
								<input
									value={quizName}
									onChange={(e) => {
										setQuizName(e.target.value);
										onChangeQuizName(e.target.value); // Call the parent component's function
									}}
									type="text"
									className="outline-none text-xs border border-primaryColor h-8 rounded px-2"
								/>
							</div>
							{/* Main Container */}
							<div className="bg-gradient-to-tr from-indigo-600 from-10% via-[rgb(111,93,192)] via-30% to-[rgb(173,125,193)] to-90% w-full rounded-[10px] mt-5 shadow-lg p-4 text-white">
								<div>
									<h3 className="font-bold">Steps</h3>
									<div className="py-2">
										<hr className="border-1 border-white" />
									</div>
									<div className="flex items-center gap-2 mt-2">
										<div className="bg-white rounded-full text-primaryColor inline-block px-[8px] py-[1px] text-sm ">
											1
										</div>
										<p className="text-sm font-medium">Create a question</p>
									</div>
									<div className="flex items-center gap-2 mt-2">
										<div className="bg-white rounded-full text-primaryColor inline-block px-[7px] py-[1px] text-sm ">
											2
										</div>
										<p className="text-sm font-medium">Add answer choices</p>
									</div>
									<div className="flex items-center gap-2 mt-2">
										<div className="bg-white rounded-full text-primaryColor inline-block px-[7px] py-[1px] text-sm ">
											3
										</div>
										<p className="text-sm font-medium">Select correct answer</p>
									</div>
								</div>
							</div>
						</div>
						{questions.map((quiz, index) => (
							<div key={quiz.id}>
								<div className="bg-gradient-to-tr from-indigo-600 from-10% via-[rgb(111,93,192)] via-30% to-[rgb(173,125,193)] to-90% text-white shadow text-xs p-3 py-5 rounded mt-4">
									<div className="flex flex-col items-center gap-2 h-auto">
										<div className="flex gap-2 w-full">
											<p>{index + 1}.</p>
											<p>Enter Question: </p>
										</div>
										<textarea
											type="text"
											placeholder=""
											value={quiz.question}
											onChange={(e) => updateQuestion(index, "question", e.target.value)}
											className="w-full outline-none text-gray-500 bg-none text-xs h-auto rounded py-5 px-2"
										/>
									</div>
								</div>
								<div className=" pt-2">
									<div className="space-y-2 pt-2">
										{quiz.choices.map((choice, choiceIndex) => (
											<div
												key={choiceIndex}
												className="border border-gradient-to-tr from-indigo-600 via-[rgb(111,93,192)] to-[rgb(173,125,193)] text-xs shadow p-3 rounded flex justify-between w-full items-center gap-10">
												<label
													htmlFor={`{choiceIndex + 1}`}
													className="bg-gradient-to-tr from-indigo-600 from-10% via-[rgb(111,93,192)] via-30% to-[rgb(173,125,193)] to-90% p-2 rounded text-white flex gap-2">
													<p className="text-xs font-medium">Choice</p> {choiceIndex + 1}
												</label>
												<input
													type="text"
													placeholder={`Add choice ${choiceIndex + 1} here`}
													value={choice}
													onChange={(e) => updateChoice(index, choiceIndex, e.target.value)}
													className="outline-none text-xs w-full"
												/>
											</div>
										))}
									</div>
								</div>
								<div className="pt-2">
									<label className="text-sm text-white">Select Correct Answer:</label>
									<select
										value={quiz.correctAnswer === null ? "" : quiz.correctAnswer}
										onChange={(e) => updateCorrectAnswer(index, e.target.value)}
										className="bg-white text-xs shadow p-3 rounded outline-none w-full">
										<option value="" disabled>
											Select correct answer
										</option>
										{quiz.choices.map((_, choiceIndex) => (
											<option key={choiceIndex} value={choiceIndex}>
												Choice {choiceIndex + 1}
											</option>
										))}
									</select>
								</div>
							</div>
						))}
						<div className="flex justify-center pt-4">
							<button
								onClick={addQuestion}
								className="flex justify-center items-center border p-2 text-[15px] gap-2 bg-primaryColor rounded-[5px]">
								<BsFillPlusCircleFill size={14} style={{ color: "white" }} />
								<span className="text-xs text-white">Question</span>
							</button>
						</div>
							<div className="flex items-center text-center justify-center pt-4">
								<h1 className="text-xs text-red-400">
									Double check the questions and selected answers, you won't be able to
									change it afterwards
								</h1>
							</div>
					</div>
				</div>
			</div>
		</>
	);
};
