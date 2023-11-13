import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl";
import { toast } from "react-toastify";

export const MyCourseCard = ({ handleIsEmpty	 }) => {
	const [courseInfo, setCourseInfo] = useState([]);

	const user_id = localStorage.getItem("user_id");

	const getCourseInfo = async () => {
		await fetch(buildUrl(`/course/user-courses`), {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user_id,
			}),
		}).then((res) => {
			return res.json().then((data) => {
				if (res.ok) {
					setCourseInfo(data.userCourses.rows);
				} else if (res.status === 400) {
					handleIsEmpty	(
						data && data.userCourses && data.userCourses.rows.length === 0,
					);
				} else {
					console.log(data);
				}
			});
			// if (res.ok) {
			// 	return res.json().then((data) => {
			//
			// 	});
			// } else if (data.userCourses.rows.length === 0) {
			//
			// } else {
			// 	return res.json().then((data) => {
			// 		console.log(data);
			// 	});
			// }
		});
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
						className="border border-gray-200 w-[300px] rounded h-auto shadow-lg">
						<div className="p-3">
							<div className="rounded h-[140px]">
								<img
									src={course?.header_url}
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
									By: {course?.first_name} {course?.last_name}
								</p>
								<p className="text-xs text-gray-600">{course?.description}</p>
							</div>
							<div className="flex items-center justify-end mt-2">
								<Link
									key={course?.course_id}
									to={`/course-module/${course?.course_id}`}>
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
