import { useState, useEffect } from "react";
import Passed from "/static/images/congrats.jpg";
import Fail from "/static/images/fail.jpg";

export const QuizResultModal = ({ quizResult, items, onResultChange }) => {
	// states
	const [isSuccess, setSuccess] = useState(false);

	const maxScore = items;
	const userPercentage = (quizResult.score / maxScore) * 100;
	const passingPercentage = 60;
	console.log("User Percentage: ", userPercentage);

	useEffect(() => {
		// Set the success state based on the user's percentage
		if (userPercentage >= passingPercentage) {
			setSuccess(true);
		} else {
			setSuccess(false);
		}
	}, [userPercentage]); // Run the effect only when userPercentage changes

	const handleImageChange = () => {
		if (userPercentage >= passingPercentage) {
			return Passed;
		} else {
			return Fail;
		}
	};

	const handleRetry = () => {
		onResultChange(true);
	};
	const handleLeave = () => {
		onResultChange(false);
	};

	return (
		<>
			<div
				className={`fixed z-40 top-0 left-0 w-full h-screen flex items-center backdrop-filter backdrop-blur-sm justify-center `}>
				<div className="w-[800px] shadow bg-white border border-gray-300 rounded p-10">
					{isSuccess ? (
						<h1 className="text-4xl font-black text-primaryColor">
							Congratulations 🎉
						</h1>
					) : (
						<h1 className="text-4xl font-black text-primaryColor">You failed...😔</h1>
					)}
					<p>
						You scored {quizResult.score || 0}/{items}
					</p>
					<div className="flex items-center justify-center pt-2">
						<img src={handleImageChange()} alt="" className="w-[500px]" />
					</div>
					<div className="flex justify-end">
						<div className="w-[400px] flex flex-col justify-end text-xs">
							<h1 className="italic text-right">
								“Tell me and I forget, teach me and I may remember, involve me and I
								learn.”
							</h1>
							<p className="flex justify-end">– Benjamin Franklin</p>
						</div>
					</div>
					<div className="flex items-center gap-4 justify-end pt-5">
						<button
							onClick={handleRetry}
							className="border border-primaryColor text-xs h-10  px-4 rounded text-primaryColor">
							retry
						</button>
						<button
							onClick={handleLeave}
							className="bg-gradient-to-r from-indigo-600 from-10% via-[rgb(111,93,192)] via-30% to-[rgb(173,125,193)] to-90% text-white flex items-center justify-center px-4 h-10  rounded cursor-pointer text-xs">
							Leave
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
