import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl";
import { toast } from "react-toastify";
import { EditCourseModal } from "./Modal/EditCourseModal";

export const MyCourseCard = ({ onIsEmptyChange }) => {
	const [courseInfo, setCourseInfo] = useState([]);
	const user_id = localStorage.getItem("user_id");

	const getCourseInfo = async () => {
		try {
			const response = await fetch(buildUrl(`/course/user-courses`), {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id,
				}),
			});

			const { coursesWithCreator, message } = await response.json();
			onIsEmptyChange(coursesWithCreator);

			if (response.ok) {
				setCourseInfo(coursesWithCreator);
			} else if (response.status === 400) {
				toast.info("You don't have any courses yet!");
			} else {
				console.error("Error:", message);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getCourseInfo();
	}, []);

	return (
		<>
			<div className="flex flex-wrap gap-5">
				{courseInfo.map((course, index) => (
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
								<p className="text-xs text-gray-600">
									By: {course?.creatorName.first_name} {course?.creatorName.last_name}
								</p>
								<p className="text-xs text-gray-600">{course?.description}</p>
							</div>
							<div className="flex items-center gap-1 justify-end mt-2">
								<Link
									key={course?.course_id}
									to={`/my-course-module/${course?.course_id}`}>
									<button className="bg-primaryColor text-xs 	text-white rounded h-8 px-4 ">
										view
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
