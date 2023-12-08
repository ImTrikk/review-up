//icons
import { IoIosCloseCircle } from "react-icons/io";
import { buildUrl } from "../../utils/buildUrl";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import LoadingBar from "react-top-loading-bar";

// toaster
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export const DeleteCourseModal = ({ onChangeDeleteModal, id }) => {
	const loadingBar = useRef(null);
	const navigator = useNavigate();

	const handleCloseDeleteModal = () => {
		onChangeDeleteModal(true);
	};

	const handleDeleteCourse = async () => {
		loadingBar.current.continuousStart(50);
		await fetch(buildUrl(`/course/delete-course/${id}`), {
			method: "DELETE",
		}).then(async (res) => {
			return res.json().then((data) => {
				if (res.ok) {
					loadingBar.current.continuousStart(60);
					setTimeout(() => {
						toast.info("Course deleted");
						loadingBar.current.complete();
						setTimeout(() => {
							navigator("/my-courses");
						}, 1200);
					}, 1000);
				} else {
					loadingBar.current.complete();
					toast.error(data.message);
				}
			});
		});
	};

	return (
		<>
			<ToastContainer autoClose={2000} />
			<LoadingBar height={7} color="#E44F48" ref={loadingBar} />
			<div
				className={`fixed z-40 top-0 left-0 w-full h-screen flex items-center backdrop-filter backdrop-blur-sm justify-center `}>
				<div className="relative w-[800px]	 shadow bg-white border border-gray-300 rounded p-10">
					<div className="flex justify-between">
						<h1 className="text-2xl font-bold text-red-500">Delete Course</h1>
						<IoIosCloseCircle
							onClick={handleCloseDeleteModal}
							size={22}
							className="text-red-500 cursor-pointer"
						/>
					</div>
					<h1 className="text-sm text-gray-500">
						Are you sure you want to delete this course?
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
							Warning: Deleting this course will permanently erase all your reviewers
							and quizzes. This action is irreversible. Are you absolutely sure you
							want to proceed with deleting your course?
						</p>
					</div>
					<div className="absolute bottom-5 right-5">
						<button
							onClick={handleDeleteCourse}
							className="bg-red-500 text-white px-2 rounded h-10 text-xs">
							Delete Course
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
