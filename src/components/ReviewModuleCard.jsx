import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { Link, useParams } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ReviewModuleCard = ({ onIsEmptyChange }) => {
	const [courseInfo, setCourseInfo] = useState([]);

	const getCourseInfo = async () => {
		try {
			const response = await fetch(buildUrl(`/course/retrieve-course`), {
				method: "GET",
			});
			const { coursesWithCreator, message } = await response.json();
			onIsEmptyChange(coursesWithCreator);
			if (response.ok) {
				setCourseInfo(coursesWithCreator);
			} else if (response.status == 400) {
				toast.info(message);
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
			<div>
				<ToastContainer />
				<div className="flex flex-wrap gap-5 max-md:justify-center">
					{courseInfo.map((course, index) => (
						<div
							key={index}
							className="border border-gray-200 bg-white w-[300px] rounded h-auto shadow-lg">
							<div className="p-3">
								<div className="rounded h-[140px]">
									<img
										src={
											course?.header_url ||
											"https://previews.123rf.com/images/artinspiring/artinspiring1805/artinspiring180500713/102430945-review-concept-illustration.jpg"
										}
										alt=""
										className="rounded w-full h-[140px]"
									/>
								</div>
								<div className="pt-2 h-[100px]">
									<h1 className="font-black text-xl text-primaryColor">
										{course?.course_code}
									</h1>
									<p className="text-sm font-medium text-gray-600">
										{course?.course_title}
									</p>
									<p className="text-xs text-gray-600 ">
										By: {course?.creatorName?.first_name} {course?.creatorName?.last_name}
									</p>
									<div className="h-5 overflow-hidden">
										<p className="text-xs text-gray-600 ">{course?.description}</p>
									</div>
								</div>
								<div className="flex items-center gap-2 justify-end mt-2">
									{/* <button
									key={course?.course_id}
									onClick={() => onClickSave(course.course_id, index)}
									className="text-red-500">
									{heartFullArray[index] ? <FaHeart size={20} /> : <CiHeart size={24} />}
								</button> */}
									<Link key={index} to={`/course-module/${course?.course_id}`}>
										<button className="bg-primaryColor text-xs text-white rounded h-7 px-2 mt-3">
											ReviewUP
										</button>
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};
