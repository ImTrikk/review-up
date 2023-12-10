import { useEffect, useState } from "react";
import { SideBar } from "../components/Navbar/DashboardComponents/SideBar";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { buildUrl } from "../utils/buildUrl";
import { useParams } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import icons

import pdf from "/static/icons/PDF.png";
import doc from "/static/icons/DOC.png";
import pptx from "/static/icons/PPT.png";
import jpg from "/static/icons/JPG.png";
import png from "/static/icons/PNG.png";
import { ReportModal } from "../components/Modal/ReportModal";

export const CourseModule = () => {
	const [courseInfo, setCourseInfo] = useState([]);
	const [quiz, setQuiz] = useState([]);
	const [heartFull, setHeartFull] = useState(false);
	const [isReportModalOpen, setReportModalOpen] = useState(false);

	const { id } = useParams();
	const user_id = localStorage.getItem("user_id");

	const getCourseInfo = async () => {
		try {
			const response = await fetch(buildUrl(`/course/get-course-info/${id}`), {
				method: "GET",
			});

			if (response.ok) {
				const data = await response.json();
				setCourseInfo(data);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const getQuiz = async () => {
		try {
			const response = await fetch(buildUrl(`/course/quiz/${id}`), {
				method: "GET",
			});

			const data = await response.json();
			console.log(data.retrievedQuizInfo);
			if (response.ok) {
				setQuiz(data.retrievedQuizInfo);
			} else {
				console.log("Something went wrong connecting with the server");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const getFileNameFromUrl = (url) => {
		const decodedUrl = decodeURIComponent(url);
		const matches = decodedUrl.match(/\/([^\/?#]+)[^\/]*$/);

		if (matches && matches.length > 1) {
			const fileNameWithId = matches[1];
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

	const handleSaveCourse = async () => {
		try {
			let response = await fetch(buildUrl(`/course/save`), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id,
					user_id,
				}),
			});
			const data = await response.json();
			if (response.ok) {
				toast.success("Saved course");
			} else {
				toast.info(data.message);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleOpenReportModal = () => {
		setReportModalOpen(true);
	};

	const onCloseReportModal = (value) => {
		if (value) {
			setReportModalOpen(false);
		}
	};

	const onClickSave = () => {
		handleSaveCourse();
		setHeartFull(true);
	};

	useEffect(() => {
		getQuiz();
		getCourseInfo();
	}, []);

	return (
		<>
			<div className="">
				<SideBar />
				<ToastContainer />
				<div className="bg-primaryColor w-full h-[140px] relative">
					<img
						src="/static/images/header.png"
						alt=""
						className="absolute w-full h-[140px]"
					/>
					<div className="w-full h-full flex justify-between items-center absolute z-10">
						<div className="ml-[220px]">
							<h1 className="text-white text-3xl font-bold">
								Course - {courseInfo.courseInfoFound?.course_code}
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
								<div className="flex items-center gap-3">
									<button
										onClick={handleOpenReportModal}
										className="text-sm border text-red-500 border-red-500 px-4 h-8 rounded">
										Report Course
									</button>
									<button
										onClick={onClickSave}
										className="flex items-center gap-2 text-sm border text-red-500 border-red-500 px-4 h-8 rounded">
										save
										{heartFull ? <FaHeart /> : <CiHeart size={20} />}
									</button>
								</div>
								{isReportModalOpen ? (
									<ReportModal
										onCloseReportModal={(value) => onCloseReportModal(value)}
									/>
								) : (
									""
								)}
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
												{getFileNameFromUrl(url).length > 15
													? `${getFileNameFromUrl(url).slice(0, 15)}...`
													: getFileNameFromUrl(url)}
											</a>
										</div>
									))}
							</div>
						</div>
						<div className="pt-10">
							<h1 className="text-lg font-bold text-primaryColor">Quizzes</h1>
							<div className="text-primaryColor">
								<hr className="border border-primaryColor" />
							</div>
							<div className="pt-2">
								<p className="text-xs text-primaryColor">Quizzes created by the user</p>
							</div>
							<div className="py-5 flex items-center gap-5">
								{quiz.map((quiz, index) => (
									<div key={index}>
										<Link to={`/quiz/${quiz.quiz_id}`}>
											<div className="bg-gradient-to-r from-indigo-600 from-10% via-[rgb(111,93,192)] via-30% to-[rgb(173,125,193)] to-90% text-white text-xs p-2 rounded">
												<h1>Quiz name: {quiz.quiz_name}</h1>
											</div>
										</Link>
									</div>
								))}
							</div>
						</div>
						{/* <div>
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
