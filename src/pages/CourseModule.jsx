import { useEffect, useState } from "react";
import { SideBar } from "../components/Navbar/DashboardComponents/SideBar";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { buildUrl } from "../utils/buildUrl";
import { useParams } from "react-router-dom";

//import icons

import pdf from "/static/icons/PDF.png";
import doc from "/static/icons/DOC.png";
import pptx from "/static/icons/PPT.png";
import jpg from "/static/icons/JPG.png";
import png from "/static/icons/PNG.png";

export const CourseModule = () => {
	const [courseInfo, setCourseInfo] = useState([]);
	const [reviewers, setReviewers] = useState([]);

	const { id } = useParams();

	const getCourseInfo = async () => {
		try {
			const response = await fetch(buildUrl(`/course/get-course-info/${id}`), {
				method: "GET",
			}).then((res) => {
				return res.json().then((data) => {
					if (res.ok) {
						setCourseInfo(data);
					}
				});
			});
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

const fileIconType = (url) => {
	// Extract the filename from the URL
	const filename = url.split("/").pop().split("?")[0];
	const extension = filename.split(".").pop();

	// You can add more file types and corresponding icons as needed
	const iconMappings = {
		pdf: pdf,
		doc: doc,
		pptx: pptx,
		jpg: jpg,
		png: png,
	};

	return iconMappings[extension];
};

useEffect(() => {
	getCourseInfo();
}, []);

return (
	<>
		<div className="">
			<SideBar />
			<div className="bg-primaryColor w-full h-[140px]">
				<div className="ml-[240px] h-full grid items-end">
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
						<div className="py-5 flex flex-wrap items-center gap-5">
							{courseInfo.fileDownloadURLs &&
								courseInfo.fileDownloadURLs.map((url, urlIndex) => (
									<div
										key={urlIndex}
										className="h-56 w-56 shadow flex flex-col items-center justify-center">
										{/* Display or use the downloadURL as needed */}
										<img src={fileIconType(url)} alt="" className="w-[100px]" />
										<div></div>
										<a
											href={url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-xs font font-semibold text-primaryColor pt-2">
											Download File {urlIndex + 1}
										</a>
									</div>
								))}
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
						<div className="py-5 flex items-center gap-5"></div>
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
						<div className="pt-5 flex flex-wrap gap-2"></div>
					</div>
				</div>
			</div>
		</div>
	</>
);
};
