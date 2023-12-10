import { useEffect, useState } from "react";
import { SideBar } from "../components/Navbar/DashboardComponents/SideBar";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { buildUrl } from "../utils/buildUrl";
import { useNavigate, useParams } from "react-router-dom";
import { EditCourseModal } from "../components/Modal/EditCourseModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

//import icons

import pdf from "/static/icons/PDF.png";
import doc from "/static/icons/DOC.png";
import pptx from "/static/icons/PPT.png";
import jpg from "/static/icons/JPG.png";
import png from "/static/icons/PNG.png";

export const SavedCourseModule = () => {
	const [courseInfo, setCourseInfo] = useState([]);
	const { id } = useParams();

	const [quiz, setQuiz] = useState([]);

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

	const getQuiz = async () => {
		try {
			const response = await fetch(buildUrl(`/course/quiz/${id}`), {
				method: "GET",
			});
			const data = await response.json();
			if (response.ok) {
				setQuiz(data.retrievedQuizInfo);
			}
		} catch (err) {
			toast.error("Error fetching data, try again later");
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

	useEffect(() => {
		getQuiz();
		getCourseInfo();
	}, []);

	return (
		<>
			<div className="">
				<SideBar />
				<ToastContainer autoClose={2000} />
				<div className="bg-primaryColor w-full h-[140px] relative">
					<img
						src="/static/images/header.png"
						alt=""
						className="absolute w-full h-[140px]"
					/>
					<div className="w-full h-full flex justify-between items-center absolute z-10">
						<div className="ml-[240px]">
							<h1 className="text-white text-3xl font-bold">
								{courseInfo.courseInfoFound?.course_code}
							</h1>
							<p className="text-white text-sm">
								{courseInfo.courseInfoFound?.description}
							</p>
						</div>
					</div>
				</div>
				<div className="ml-[210px]">
					<div className="p-8">
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
						<h1 className="text-lg font-bold text-primaryColor">Quizzes</h1>
						<div className="text-primaryColor pt-1">
							<hr className="border border-primaryColor" />
						</div>
						<div className="pt-2">
							<p className="text-xs text-primaryColor">Quizzes created by the user</p>
						</div>
						<div className="py-5 flex gap-5 flex-wrap">
							{quiz.map((quiz, index) => (
								<div key={index}>
									<div className="flex items-center gap-2">
										<Link key={index} to={`/quiz/${quiz.quiz_id}`}>
											<div className="bg-gradient-to-r from-indigo-600 from-10% via-[rgb(111,93,192)] via-30% to-[rgb(173,125,193)] to-90% text-white text-xs p-2 rounded h-10 flex items-center justify-center">
												<h1>Quiz name: {quiz.quiz_name}</h1>
											</div>
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
