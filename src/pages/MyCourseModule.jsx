import { useEffect, useState } from "react";
import { SideBar } from "../components/Navbar/DashboardComponents/SideBar";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { buildUrl } from "../utils/buildUrl";
import { useNavigate, useParams } from "react-router-dom";
import { EditCourseModal } from "../components/Modal/EditCourseModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { DragDropFile } from "../components/DragDropFile";
//import icons

import { CiCirclePlus } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { BiSolidErrorCircle } from "react-icons/bi";
// import { FaTrash } from "react-icons/fa";

import pdf from "/static/icons/PDF.png";
import doc from "/static/icons/DOC.png";
import pptx from "/static/icons/PPT.png";
import jpg from "/static/icons/JPG.png";
import png from "/static/icons/PNG.png";

import LoadingBar from "react-top-loading-bar";
import { useRef } from "react";
import { QuizModal } from "../components/Modal/QuizModal";
import { DeleteCourseModal } from "../components/Modal/DeleteCourseModal";
import { DelteFileModal } from "../components/Modal/DeleteFileModal";
import { DeleteQuizModal } from "../components/Modal/DeleteQuizModal";

export const MyCourseModule = () => {
	const [courseInfo, setCourseInfo] = useState([]);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [quiz, setQuiz] = useState([]);
	const [isQuizModalOpen, setQuizModalOpen] = useState(false);

	// opening delete modal
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

	const { id } = useParams();
	const user_id = localStorage.getItem("user_id");

	const getCourseInfo = async () => {
		try {
			const response = await fetch(buildUrl(`/course/get-course-info/${id}`), {
				method: "GET",
			});
			const data = await response.json();
			if (response.ok) {
				setCourseInfo(data);
			}
		} catch (error) {
			toast.error("Error fetching course information, try again later");
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

	const openEditModal = () => {
		setIsEditOpen(true);
	};

	const closeEditModal = () => {
		setIsEditOpen(false);
	};

	const saveEditedData = (editedData) => {
		// Implement logic to save the edited data, e.g., make an API call
	};

	const navigator = useNavigate();

	const loadingBar = useRef(null);

	const handleDeleteModal = () => {
		setDeleteModalOpen(true);
	};

	const onChangeDeleteModal = (value) => {
		if (value) {
			setDeleteModalOpen(false);
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

	const [isOpenDeleteFile, setOpenDeleteFile] = useState(false);
	const [url, setUrl] = useState("");

	// delete file
	const handleDeleteReviewer = (url) => {
		setUrl(url);
		setOpenDeleteFile(true);
	};

	const onChangeDeleteFileModal = (value) => {
		console.log(value);
		if (value) {
			setOpenDeleteFile(false);
		}
	};

	useEffect(() => {
		getQuiz();
		getCourseInfo();
	}, []);

	const [isDeleteQuizModalOpen, setDeleteQuizModalOpen] = useState(false);
	const [quiz_id, setQuiz_id] = useState("");
	const [quizNameDelete, setQuizNameDelete] = useState("");

	const handleDeleteQuiz = (quizId, quiz_name) => {
		console.log(quizId);
		setQuiz_id(quizId);
		setQuizNameDelete(quiz_name);
		setDeleteQuizModalOpen(true);
	};

	const onChangeDeleteQuizModal = (value) => {
		if (value) {
			setDeleteQuizModalOpen(false);
		}
	};

	// handling the quiz
	const handleOpenQuizModal = () => {
		setQuizModalOpen(true);
	};

	const handleCloseQuizModal = () => {
		setQuizModalOpen(false);
	};

	const handleQuestionChange = (value) => {
		setQuestions(value);
	};

	const handleQuizNameChange = (value) => {
		setQuizName(value);
	};

	// for quiz
	const [questionList, setQuestions] = useState([]);
	const [quizName, setQuizName] = useState("");

	const course_id = useParams();

	const handleCreateQuiz = async (e) => {
		e.preventDefault();
		loadingBar.current.continuousStart(50);
		const formData = new FormData();
		if (quizName != "") {
			formData.append("quiz_name", quizName);
			formData.append("user_id", user_id);
			formData.append("course_id", course_id.id);
			questionList.forEach((question, index) => {
				formData.append(`question[${index}][question_id]`, question.id);
				formData.append(`question[${index}][question]`, question.question);
				formData.append(`question[${index}][choices]`, question.choices.join(","));
				formData.append(
					`question[${index}][correctAnswer]`,
					question.correctAnswer,
				);
			});
		}
		// Log FormData entries
		console.log("FormData entries:");
		for (const entry of formData.entries()) {
			console.log(entry);
		}
		console.log(formData);

		try {
			let response = await fetch(buildUrl(`/course/quiz/create-quiz`), {
				method: "POST",
				body: formData,
				headers: {
					Accept: "application/json",
				},
			});
			console.log(response);
			if (response.ok) {
				loadingBar.current.complete();
				toast.success("Quiz has been created");
				setTimeout(() => {
					window.location.reload();
				}, 3000);
			}
		} catch (err) {
			loadingBar.current.complete();
			console.log(err);
		}
	};

	// handling new files
	const [fileList, setFileList] = useState([]);

	const onFileChange = (files) => {
		setFileList(files);
	};

	const handleSaveNewFile = async () => {
		if (fileList.length !== 0) {
			loadingBar.current.continuousStart(50);
			const formData = new FormData();
			formData.append("course_id", course_id.id);
			formData.append("user_id", user_id);
			// Append each selected file to the FormData
			fileList.forEach((file) => {
				formData.append("file", file);
			});

			// Check file size
			const maxSize = 4.5 * 1024 * 1024; // 4.5 MB in bytes
			const totalSize = fileList.reduce((acc, file) => acc + file.size, 0);

			if (totalSize > maxSize) {
				toast.error("File size exceeds the limit (4.5 MB)", {
					autoClose: 3000,
				});
				return;
			}

			console.log("FormData entries:");
			for (const entry of formData.entries()) {
				console.log(entry);
			}
			console.log(formData);

			try {
				let response = await fetch(buildUrl(`/course/save-new-file`), {
					method: "POST",
					body: formData,
				});
				if (response.ok) {
					loadingBar.current.complete();

					toast.success("New reviewers posted");
					setTimeout(() => {
						window.location.reload();
					}, 3000);
				}
			} catch (err) {
				loadingBar.current.complete();
				console.log(err);
				toast.error("Internal server error, try again later");
			}
		} else {
			toast.error("Input first a reviewer");
		}
	};

	return (
		<>
			<div className="">
				<SideBar />
				<LoadingBar height={7} color="#E44F48" ref={loadingBar} />
				<ToastContainer autoClose={2000} />
				{isEditOpen ? (
					<EditCourseModal
						onClose={closeEditModal}
						onSave={saveEditedData}
						id={id}
						courseInfo={courseInfo}
					/>
				) : (
					""
				)}
				<div className="bg-primaryColor w-full h-[140px] relative">
					<img
						src="/static/images/header.png"
						alt=""
						className="absolute w-full h-[140px]"
					/>
					<div className="w-full h-full flex justify-between items-center absolute z-10">
						<div className="ml-[80px] lg:ml-[220px]">
							<h1 className="text-white text-3xl font-bold">
								My Course - {courseInfo.courseInfoFound?.course_code}
							</h1>
							<p className="text-white text-sm">
								{courseInfo.courseInfoFound?.description}
							</p>
						</div>
						<div className="mt-auto mr-12	 pb-5 flex gap-2">
							<button
								onClick={openEditModal}
								className="border border-white h-10 rounded px-5 text-white text-xs">
								Edit
							</button>
							<button
								onClick={handleDeleteModal}
								className="bg-red-500 h-10 rounded px-5 text-white text-xs">
								Delete Course
							</button>
						</div>
						{isDeleteModalOpen ? (
							<DeleteCourseModal
								onChangeDeleteModal={(value) => onChangeDeleteModal(value)}
								id={id}
							/>
						) : (
							""
						)}
					</div>
					{isOpenDeleteFile ? (
						<DelteFileModal
							onChangeDeleteFileModal={(value) => onChangeDeleteFileModal(value)}
							url={url}
							user_id={user_id}
						/>
					) : (
						""
					)}
					{isDeleteQuizModalOpen ? (
						<form>
							<DeleteQuizModal
								onChangeDeleteQuizModal={(value) => onChangeDeleteQuizModal(value)}
								quiz_id={quiz_id}
								quizNameDelete={quizNameDelete}
							/>
						</form>
					) : (
						""
					)}
				</div>
				<div className="ml-[60px] lg:ml-[200px]">
					<div className="p-8">
						<h1 className="text-lg font-bold text-primaryColor">Reviewers</h1>
						<div className="text-primaryColor pt-1">
							<hr className="border border-primaryColor" />
						</div>
						<div className="pt-2">
							<p className="text-xs text-primaryColor">
								Reviewers created by the user
							</p>
						</div>
						<div className="lg:flex items-start gap-2">
							<div className="flex flex-col items-start">
								<div className="lg:w-[400px] mt-5 h-fit bg-white shadow rounded">
									<DragDropFile onFileChange={(files) => onFileChange(files)} />
								</div>
								<button
									onClick={handleSaveNewFile}
									className="mt-5 border border-primaryColor rounded px-4 h-8 text-primaryColor hover:bg-primaryColor hover:text-white text-xs flex items-center justify-center">
									Save
								</button>
							</div>
							<div className="py-5 flex flex-wrap items-center gap-5">
								{courseInfo.fileDownloadURLs &&
									courseInfo.fileDownloadURLs.map((url, urlIndex) => (
										<div
											key={urlIndex}
											className="h-44 w-44 shadow flex flex-col items-center justify-center group rounded relative">
											{/* Hidden by default, shown on group hover */}
											<div
												onClick={() => handleDeleteReviewer(url)}
												className="hidden group-hover:flex flex-col items-center justify-center bg-red-600 rounded h-full w-full cursor-pointer">
												<FaTrash size={52} className="text-white" />
												<p className="text-white">Remove File?</p>
											</div>
											{/* Shown by default, hidden on group hover */}
											<div className="flex justify-center items-center flex-col group-hover:hidden h-full w-full">
												<img
													src={fileIconType(url)}
													alt=""
													className="w-[80px] group-hover:hidden"
												/>
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
										</div>
									))}
							</div>
						</div>
						<div className="pt-10">
							<div className="flex justify-between">
								<h1 className="text-lg font-bold text-primaryColor">Quizzes</h1>
								{isQuizModalOpen ? (
									<button
										onClick={handleCloseQuizModal}
										className="flex items-center gap-2 bg-red-500 h-8 rounded px-2 text-xs text-white	">
										<CiCircleRemove size={20} />
										Close
									</button>
								) : (
									<button
										onClick={handleOpenQuizModal}
										className="flex items-center gap-2 border border-primaryColor h-8 rounded px-2 text-xs text-primaryColor">
										<CiCirclePlus size={20} />
										Add Quiz
									</button>
								)}
							</div>
							<div className="text-primaryColor pt-1">
								<hr className="border border-primaryColor" />
							</div>
							{isQuizModalOpen ? (
								<div>
									<QuizModal
										onChangeQuestions={handleQuestionChange}
										onChangeQuizName={handleQuizNameChange}
									/>
									<div className="flex justify-end pt-5">
										<button
											onClick={handleCreateQuiz}
											className="h-10 px-4 border border-primaryColor rounded text-primaryColor hover:bg-primaryColor hover:text-white">
											Create Quiz
										</button>
									</div>
								</div>
							) : (
								""
							)}
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
											<div
												onClick={() => handleDeleteQuiz(quiz.quiz_id, quiz.quiz_name)}
												className="border h-10 px-2 flex items-center justify-center border-red-500 p-1 text-red-500 rounded hover:bg-red-500 hover:text-white">
												<FaTrash size={18} />
											</div>
										</div>
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
