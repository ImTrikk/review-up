import { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

export const QuizModal = () => {
	const [quiz_id, setQuiID] = useState();
	const [choice_id, setChoiceID] = useState();
	const [choice, setChoice] = useState();
	const [correctAnswer, setCorrectChoice] = useState();
	const [isTrue, setIstrue] = useState();
	const [questions, setQuestions] = useState([]);

	const addQuestion =(event) => {
		event.preventDefault();
		// Use the spread operator to create a new array with the existing questions and the new question
		setQuestions([...questions, { quiz_id: questions.length + 1 }]);
	};
	const removeQuestion =(event) => {
		event.preventDefault();
		// Use the spread operator to create a new array with the existing questions and the new question
		setQuestions([...questions, { quiz_id: questions.length - 1 }]);
	};

	return (
		<>
			<div className="pt-8">
				<div className="border border-primaryColor shadow rounded p-5">
					<h1 className="text-primaryColor text-xs">
						Practice quiz for this module
					</h1>
					<div>
						<div className="pt-5">
							{/* Main Container */}
							<div className="bg-primaryColor w-full rounded-[10px] mt-5 shadow-lg p-4 text-white">
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
						<div>
							{questions.map((quiz, index) => (
								<div key={index}>
									<div className="bg-primaryColor text-white shadow text-xs p-3 py-5 rounded mt-4">
										<div className="flex items-center gap-2">
											<div className="flex gap-2">
												<p>{index + 1}.</p>
												<p>Enter Question: </p>
											</div>
											<input
												type="text"
												placeholder=""
												className="outline-none text-gray-500 bg-none text-xs"
											/>
										</div>
									</div>
									<div className="space-y-2 pt-2">
										<div className="bg-white text-xs shadow p-3 rounded">
											<input
												type="text"
												placeholder="add question here"
												className="outline-none text-xs"
											/>
										</div>
										<div className="bg-white text-xs shadow p-3 rounded">
											<input
												type="text"
												placeholder="add question here"
												className="outline-none text-xs"
											/>
										</div>
										<div className="bg-white text-xs shadow p-3 rounded">
											<input
												type="text"
												placeholder="add question here"
												className="outline-none text-xs"
											/>
										</div>
										<div className="bg-white text-xs shadow p-3 rounded">
											<input
												type="text"
												placeholder="add question here"
												className="outline-none text-xs"
											/>
										</div>
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
						</div>
						{/* <div className="flex justify-end pt-5">
							<button className="text-xs text-white bg-primaryColor rounded h-8 px-4">
								Save
							</button>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
};
