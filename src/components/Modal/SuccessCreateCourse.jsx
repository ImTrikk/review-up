import { BiRightArrow, BiRightArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export const SuccessCreateCourse = () => {
	const navigator = useNavigate();

	const handleClose = () => {
		setTimeout(() => {
			navigator("/my-courses");
		}, 3000);
	};

	return (
		<>
			<div className="bg-white shadow w-[700px] h-[500px] rounded p-5 z-50 absolute">
				<div className="flex items-center justify-center">
					<div className="pt-5">
						<div>
							<img
								src="/static/images/success.jpg"
								alt=""
								className="w-[500px] rounded object-contain"
							/>
						</div>
						<h1 className="text-lg text-center text-primaryColor font-semibold">
							Success creating a review course!
						</h1>
					</div>
				</div>
				<div className="mt-auto flex justify-end items-end absolute right-5 bottom-5">
					<button
						onClick={handleClose}
						className="bg-primaryColor flex items-center px-4 h-10 rounded text-xs text-white">
						My courses <BiRightArrowAlt size={20} />
					</button>
				</div>
			</div>
		</>
	);
};
