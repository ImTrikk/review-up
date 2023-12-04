import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { Link, useParams } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl";
import { FaTrash } from "react-icons/fa6";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SavedCourseCard = ({ onIsEmptyChange }) => {
	const [savedCourseInfo, setCourseInfo] = useState([]);

	const user_id = localStorage.getItem("user_id");

	const getCourseInfo = async () => {
		try {
			const response = await fetch(buildUrl(`/course/retrieve-save`), {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id,
				}),
			});
			const { coursesWithUsernames, message } = await response.json();
			onIsEmptyChange(coursesWithUsernames);
			if (response.ok) {
				setCourseInfo(coursesWithUsernames);
			} else if (response.status === 400) {
				console.log("In here");
				toast.info(message);
			} else {
				toast.error("Internal server error");
			}
		} catch (error) {
			console.error("Error fetching course information:", error);
		}
	};

	const onClickRemove = async (course_id, index) => {
		try {
			let response = await fetch(
				buildUrl(`/course/remove-saved/${course_id}/${user_id}`),
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			const data = await response.json();
			if (response.ok) {
				// Course successfully removed, you may want to update your UI accordingly
				console.log("Course removed successfully");
				toast.success("Course removed successfully", {
					autoClose: 3000,
				});
				setTimeout(() => {
					window.location.reload();
				}, 3000);
			} else {
				console.log(data.message);
				console.log("Failed to remove course");
			}
		} catch (err) {
			console.error("Error:", err);
		}
	};

	useEffect(() => {
		getCourseInfo();
	}, []);

	return (
		<>
			<ToastContainer />
			<div className="flex flex-wrap gap-5 max-md:justify-center">
				{savedCourseInfo.map((course, index) => (
					<div
						key={index}
						className="border bg-white border-gray-200 w-[300px] rounded h-auto shadow-lg">
						<div className="p-3">
							<div className="rounded h-[140px]">
								<img
									src={
										course?.header_url ||
										"https://previews.123rf.com/images/artinspiring/artinspiring1805/artinspiring180500713/102430945-review-concept-illustration.jpg"
									}
									alt=""
									className="rounded w-full h-[140px] overflow-clip"
								/>
							</div>
							<div className="pt-2 overflow-hidden h-[100px]">
								<h1 className="font-black text-xl text-primaryColor">
									{course?.course_code}
								</h1>
								<p className="text-sm font-medium text-gray-600">
									{course?.course_title}
								</p>
								<p className="text-xs text-gray-600">By: {course?.authorName}</p>
								<p className="text-xs text-gray-600">{course?.description}</p>
							</div>
							<div className="flex items-center gap-2 justify-end mt-2">
								<button
									key={index}
									onClick={() => onClickRemove(course.course_id, index)}
									className="text-red-500">
									<FaTrash />
								</button>
								<Link
									key={course?.course_id}
									to={`/saved-course-module/${course?.course_id}`}>
									<button className="bg-primaryColor text-xs text-white rounded h-7 px-2 ">
										ReviewUP
									</button>
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
