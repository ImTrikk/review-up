import { useState } from "react";

export const QuizProgressmodal = ({ onProgressChange }) => {
	const handleBack = () => {
		onProgressChange(true);
	};
	const handleContinue = () => {
		onProgressChange(false);
	};

	return (
		<>
			<div
				className={`fixed z-40 top-0 left-0 w-full h-screen flex items-center backdrop-filter backdrop-blur-sm justify-center `}>
				<div className="flex items-center justify-center">
					<div className="w-[400px] shadow bg-white border border-gray-300 rounded p-10">
						<h1 className="text-lg font-medium">
							You will lose progress now if you leave the quiz page now
						</h1>
						<div className="flex items-center gap-2 justify-end pt-10">
							<button
								onClick={handleBack}
								className="border border-violet-500 p-2 text-xs px-2 text-primaryColor rounded">
								go back to quiz
							</button>
							<button
								onClick={handleContinue}
								className="bg-gradient-to-r from-indigo-600 from-10% via-[rgb(111,93,192)] via-30% to-[rgb(173,125,193)] to-90% text-white p-2 rounded text-xs">
								Leave
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
