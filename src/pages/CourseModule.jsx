import { useEffect, useState } from "react";
import { SideBar } from "../components/Navbar/DashboardComponents/SideBar";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { buildUrl } from "../utils/buildUrl";
import { useParams } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

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

	const getFileNameFromUrl = (url) => {
		const decodedUrl = decodeURIComponent(url);
		const matches = decodedUrl.match(/\/([^\/?#]+)[^\/]*$/);

		if (matches && matches.length > 1) {
			const fileNameWithId = matches[1];
			// Remove the initial identifier (e.g., "af2fe498-30a7-4317-a4cd-9284d53534f2_")
			const fileNameWithoutId = fileNameWithId.replace(/^[^_]+_/, "");
			return fileNameWithoutId;
		}

		return null;
	};

	const fileIconType = (url) => {
		// Extract the filename from the URL
		const filename = getFileNameFromUrl(url);
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

	const [heartFull, setHeartFull] = useState(false);

	const onClickSave = () => {
		setHeartFull(true);
	};

	useEffect(() => {
		getCourseInfo();
	}, []);

	return (
		<>
			<div className="">
				<SideBar />
				<div className="bg-primaryColor w-full h-[140px] relative">
					<img
						src="/static/images/header.png"
						alt=""
						className="absolute w-full h-[140px]"
					/>
					<div className="w-full h-full flex justify-between items-center absolute z-10">
						<div className="ml-[220px]">
							<h1 className="text-white text-3xl font-bold">
								My Course - {courseInfo.courseInfoFound?.course_code}
							</h1>
							<p className="text-white text-sm">
								{courseInfo.courseInfoFound?.description}
							</p>
						</div>
					</div>
				</div>
				<div className="ml-[220px] mr-10">
					<div className="p-5">
						<div>
							<div className="flex items-center justify-between py-2">
								<h1 className="text-lg font-bold text-primaryColor">Reviewers</h1>
								<button
									onClick={onClickSave}
									className="flex items-center gap-2 text-sm border text-red-500 border-red-500 px-4 h-8 rounded">
									save
									{heartFull ? <FaHeart /> : <CiHeart size={20} />}
								</button>
							</div>
							<div className="text-primaryColor">
								<hr className="border border-primaryColor" />
							</div>
							<div className="pt-2">
								<p className="text-xs text-primaryColor">
									Reviewers posted by the creator
								</p>
							</div>
							<div className="pt-10 flex flex-wrap items-center gap-5">
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
												{getFileNameFromUrl(url)}
												{/* {urlIndex + 1} */}
											</a>
										</div>
									))}
							</div>
						</div>
						{/* <div>
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
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
};
