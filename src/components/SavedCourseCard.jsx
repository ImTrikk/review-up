import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { Link, useParams } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SavedCourseCard = ({ onIsEmptyChange }) => {
	const [savedCourseInfo, setCourseInfo] = useState([]);
	const [heartFullArray, setHeartFullArray] = useState([]);

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

			if (response.ok) {
				setCourseInfo(coursesWithUsernames);
			} else if (response.status === 400) {
				console.log("In here");
				toast.info(message);
				onIsEmptyChange(
					data && data.allCourses && data.allCourses.rows.length === 0,
				);
			} else {
				toast.error("Internal server error");
			}
		} catch (error) {
			console.error("Error fetching course information:", error);
		}
	};

	useEffect(() => {
		getCourseInfo();
	}, []);

	return (
		<>
			<ToastContainer />
			<div className="flex flex-wrap gap-5">
				{savedCourseInfo.map((course, index) => (
					<div
						key={index}
						className="border border-gray-200 w-[300px] rounded h-auto shadow-lg">
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
