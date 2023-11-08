import { useNavigate } from "react-router-dom";

export const SuccessCreateCourse = () => {
	const navigator = useNavigate();

	const handleClose = () => {
		setTimeout(() => {
			navigator("/dashboard");
		}, 3000);
	};

	return (
		<>
			<div className="bg-white shadow w-[700px] h-[500px] rounded p-5 fixed">
				<div className="h-auto">
					<h1>Success creating a review course!</h1>
					<div className="mt-auto flex justify-end items-end">
						<button
							onClick={handleClose}
							className="bg-primaryColor px-4 h-10 rounded text-xs text-white">
							dashboard
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
