//icons
import { IoIosCloseCircle } from "react-icons/io";
import { buildUrl } from "../../utils/buildUrl";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import LoadingBar from "react-top-loading-bar";

// toaster
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export const DeleteQuizModal = ({
	onChangeDeleteQuizModal,
	quiz_id,
	quizNameDelete,
}) => {
	const loadingBar = useRef(null);
	const navigator = useNavigate();

	const handleCloseDeleteModal = () => {
		onChangeDeleteQuizModal(true);
	};

	let user_id = localStorage.getItem("user_id");

	// hanlde delte quiz
	const handleDeleteQuiz = async () => {
		loadingBar.current.continuousStart(50);
		try {
			let response = await fetch(buildUrl(`/course/quiz/delete-quiz/${quiz_id}`), {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id,
					quizNameDelete,
				}),
			});
			if (response.ok) {
				console.log("Quiz deleted");
				loadingBar.current.complete();
				toast.success("Quiz deleted");
				setTimeout(() => {
					window.location.reload();
				}, 3000);
			}
			loadingBar.current.complete();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<ToastContainer autoClose={2000} />
			<LoadingBar height={7} color="#E44F48" ref={loadingBar} />
			<div
				className={`fixed z-40 top-0 left-0 w-full h-screen flex items-center backdrop-filter backdrop-blur-sm justify-center `}>
				<div className="relative w-[800px]	 shadow bg-white border border-gray-300 rounded p-10">
					<div className="flex justify-between">
						<h1 className="text-2xl font-bold text-red-500">Delete Quiz</h1>
						<IoIosCloseCircle
							onClick={handleCloseDeleteModal}
							size={22}
							className="text-red-500 cursor-pointer"
						/>
					</div>
					<h1 className="text-sm text-gray-500">
						Are you sure you want to delete this quiz?
					</h1>
					<div className="flex items-center justify-center">
						<img
							src="/static/images/delete.jpg"
							alt=""
							className="w-full lg:w-[400px]"
						/>
					</div>
					<div className="pb-8">
						<p className="text-xs text-red-500">
							Warning: Deleting this quiz will permanently be removed in your course.
							This action is irreversible. Are you absolutely sure you want to proceed
							with deleting your quiz?
						</p>
					</div>
					<div className="absolute bottom-5 right-5">
						<button
							onClick={handleDeleteQuiz}
							className="bg-red-500 text-white px-2 rounded h-10 text-xs">
							Delete Quiz
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
