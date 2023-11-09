import { useEffect, useState } from "react";
import { SideBar } from "../components/Navbar/DashboardComponents/SideBar";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { buildUrl } from "../utils/buildUrl";
import { useParams } from "react-router-dom";

export const CourseModule = () => {
	const [courseInfo, setCourseInfo] = useState([]);

	const { id } = useParams();

	const getCourseInfo = async () => {
		try {
			const response = await fetch(buildUrl(`/course/get-course-info/${id}`), {
				method: "GET",
			});

			if (!response.ok) {
				throw new Error(`Failed to fetch data. Status: ${response.status}`);
			}

			const data = await response.json();
			setCourseInfo(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		getCourseInfo();
	}, []);

	return (
		<>
			<div className="">
				<SideBar />
				<div className="bg-primaryColor w-full h-[140px]">
					<div className="ml-[220px] h-full grid items-end">
						<div className="pb-10">
							<h1 className="text-white text-3xl font-bold">
								{courseInfo.courseInfoFound?.course_code}
							</h1>
							<p className="text-white text-sm">
								{courseInfo.courseInfoFound?.description}
							</p>
						</div>
					</div>
				</div>
				<div className="ml-[220px]">
					<div className="p-5">
						<div>
							<h1 className="text-lg font-bold text-primaryColor">Reviewers</h1>
							<div className="text-primaryColor">
								<hr className="border border-primaryColor" />
							</div>
							<div className="pt-2">
								<p className="text-xs text-primaryColor">
									Reviewers posted by the creator
								</p>
							</div>
							<div className="py-5 flex items-center gap-5">
								<div className="border border-primaryColor h-56 w-56 rounded"></div>
								<div className="border border-primaryColor h-56 w-56 rounded"></div>
								<div className="border border-primaryColor h-56 w-56 rounded"></div>
								<div className="border border-primaryColor h-56 w-56 rounded"></div>
							</div>
						</div>
						<div>
							<h1 className="text-lg font-bold text-primaryColor">Quizzes</h1>
							<div className="text-primaryColor">
								<hr className="border border-primaryColor" />
							</div>
							<div className="pt-2">
								<p className="text-xs text-primaryColor">Quizzes created by the user</p>
							</div>
							<div className="py-5 flex items-center gap-5">
								<div className="border border-primaryColor h-56 w-56 rounded"></div>
								<div className="border border-primaryColor h-56 w-56 rounded"></div>
								<div className="border border-primaryColor h-56 w-56 rounded"></div>
								<div className="border border-primaryColor h-56 w-56 rounded"></div>
							</div>
						</div>
						<div>
							<h1 className="text-lg font-bold text-primaryColor">
								Links and other resources
							</h1>
							<div className="text-primaryColor">
								<hr className="border border-primaryColor" />
							</div>
							<div className="pt-2">
								<p className="text-xs text-primaryColor">
									Links and other resources to study on
								</p>
							</div>
							<div className="pt-5 flex flex-wrap gap-2">
								<div className="border border-primaryColor text-sm font-medium text-primaryColor flex items-center justify-between h-8 w-[200px] rounded px-2">
									<p>Link: </p>
									<div className="flex justify-end">
										<BsArrowUpRightCircleFill />
									</div>
								</div>
								<div className="border border-primaryColor text-sm font-medium text-primaryColor flex items-center justify-between h-8 w-[200px] rounded px-2">
									<p>Link: </p>
									<div className="flex justify-end">
										<BsArrowUpRightCircleFill />
									</div>
								</div>
								<div className="border border-primaryColor text-sm font-medium text-primaryColor flex items-center justify-between h-8 w-[200px] rounded px-2">
									<p>Link: </p>
									<div className="flex justify-end">
										<BsArrowUpRightCircleFill />
									</div>
								</div>
								<div className="border border-primaryColor text-sm font-medium text-primaryColor flex items-center justify-between h-8 w-[200px] rounded px-2">
									<p>Link: </p>
									<div className="flex justify-end">
										<BsArrowUpRightCircleFill />
									</div>
								</div>
								<div className="border border-primaryColor text-sm font-medium text-primaryColor flex items-center justify-between h-8 w-[200px] rounded px-2">
									<p>Link: </p>
									<div className="flex justify-end">
										<BsArrowUpRightCircleFill />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
