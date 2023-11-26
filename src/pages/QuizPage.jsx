import { useState } from "react";
import { Link } from "react-router-dom";

export const QuizPage = () => {

	const [isResultOpen, setResultOpen] = useState(false)

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
				</div>
			</div>
		</>
	);
};
