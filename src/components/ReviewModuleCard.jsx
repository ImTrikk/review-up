import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl";

export const ReviewModuleCard = ({ onIsEmptyChange }) => {
	const [courseInfo, setCourseInfo] = useState([]);

	const getCourseInfo = async () => {
		try {
			const res = await fetch(buildUrl(`/course/retrieve-course`), {
				method: "GET",
			});

			const data = await res.json();

			if (res.ok) {
				setCourseInfo(data.allCourses.rows);
			} else if (res.status === 400) {
				onIsEmptyChange(
					data && data.allCourses && data.allCourses.rows.length === 0,
				);
			} else {
				console.log(error);
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
			<div className="flex flex-wrap gap-5">
				{courseInfo.map((course, index) => (
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
