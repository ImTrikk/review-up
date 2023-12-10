import { useState } from "react";
import { NotesDragDrop } from "../NotesDragDrop";
import { QuizModal } from "./QuizModal";

import { FaTrash } from "react-icons/fa";
import { BiSolidErrorCircle } from "react-icons/bi";

import pdf from "/static/icons/PDF.png";
import doc from "/static/icons/DOC.png";
import pptx from "/static/icons/PPT.png";
import jpg from "/static/icons/JPG.png";
import png from "/static/icons/PNG.png";
import { buildUrl } from "../../utils/buildUrl";
import { DragDropFile } from "../DragDropFile";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const EditCourseModal = ({ onClose, onSave, courseInfo, id }) => {
	const loadingBar = useRef(null);
	const [fileList, setFileList] = useState([]);
	const [questionList, setQuestions] = useState([]);
	const [quizName, setQuizName] = useState("");

	const user_id = localStorage.getItem("user_id");
	const course_id = id;

	const file_id = courseInfo.courseInfoFound?.file_id;

	// course info states

	const [course_code, setCourseCode] = useState("");
	const [course_title, setCourseTitle] = useState("");
	const [course_program, setCourseProgram] = useState("");
	const [description, setDescription] = useState("");
	const [headerUrl, setHeaderUrl] = useState("");

	const [isEmpty, setIsEmpty] = useState(false);
	// error handlers
	const [codeError, setCodeError] = useState(false);
	const [titleError, setTitleError] = useState(false);
	const [programError, setProgramError] = useState(false);
	const [descriptionError, setDescriptionError] = useState(false);
	const [headerError, setHeaderError] = useState(false);

	// navigator
	const nav = useNavigate();

	const handleSubmitUpdate = async (e) => {
		e.preventDefault();
		if (course_code == "") {
			setCodeError(true);
			setTimeout(() => {
				setCodeError(false);
			}, 5000);
		}
		if (course_title == "") {
			setTitleError(true);
			setTimeout(() => {
				setTitleError(false);
			}, 5000);
		}
		if (course_program == "") {
			setProgramError(true);
			setTimeout(() => {
				setProgramError(false);
			}, 5000);
		}
		if (description == "") {
			setDescriptionError(true);
			setTimeout(() => {
				setDescriptionError(false);
			}, 5000);
		}
		if (headerUrl == "") {
			setHeaderError(true);
			setTimeout(() => {
				setHeaderError(false);
			}, 5000);
		}
		if (
			course_code !== "" &&
			course_title !== "" &&
			course_program !== "" &&
			description !== "" &&
			headerUrl !== ""
		) {
			loadingBar.current.continuousStart(50);
			console.log("Handling update");
			const formData = new FormData();
			formData.append("course_id", course_id);
			formData.append("course_code", course_code);
			formData.append("course_title", course_title);
			formData.append("course_program", course_program);
			formData.append("description", description);
			formData.append("user_id", user_id);
			formData.append("header_url", headerUrl);
			formData.append("file_id", file_id);

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

			try {
				let response = await fetch(buildUrl(`/course/course-update/${file_id}`), {
					method: "POST",
					body: formData,
				});

				console.log(response.status);
				if (response.status === 200) {
					console.log("Course information updated");
					loadingBar.current.complete();
					toast.info("Course Update!");
					setTimeout(() => {
						nav("/my-courses");
					}, 3000);
				} else {
					toast.error("Internal server error");
				}
			} catch (err) {
				loadingBar.current.complete();
				console.log("Error fetching", err);
			}
		}
	};

	const onFileChange = (files) => {
		console.log("OnfileHCnage");
		setFileList(files);
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

	return (
		<>
			<ToastContainer autoClose={3000} />
			<LoadingBar height={7} color="#E44F48" ref={loadingBar} />
			<div
				className={`fixed z-40 top-0 left-0 w-full h-screen flex items-center justify-center `}>
				<div
					className="fixed top-0 left-0 w-full h-full backdrop-filter backdrop-blur-sm"
					style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}></div>

				<div className="border border-gray-300 bg-white w-[700px] h-[650px]  rounded p-5 relative overflow-y-auto">
					<h1 className="text-lg font-bold text-primaryColor">Edit Course Module</h1>
					<div className="py-2">
						<hr />
					</div>
					<div className="py-2">
						<h1 className="text-sm">Course Information</h1>
					</div>
					<form>
						<div className="w-full">
							<div className="flex gap-8">
								<div className="flex flex-col">
									<label htmlFor="" className="text-sm text-primaryColor">
										Course Code:
									</label>
									<div className="flex flex-col">
										<input
											type="text"
											placeholder="ex. 'IT109'"
											value={course_code}
											onChange={(e) => setCourseCode(e.target.value)}
											className={`${
												isEmpty
													? "border border-red-500 text-xs px-4 h-10 w-full lg:w-[300px] rounded outline-none"
													: "border border-primaryColor text-xs px-4 h-10 w-full lg:w-[300px] rounded outline-none"
											}`}
										/>
										{codeError ? (
											<div className="pt-1 text-xs text-red-600 flex items-center gap-1">
												<BiSolidErrorCircle />
												<p>This field is required</p>
											</div>
										) : (
											""
										)}
									</div>
								</div>
								<div className="flex flex-col overflow-auto">
									<label htmlFor="" className="text-sm text-primaryColor">
										Course Title:
									</label>
									<div className="flex flex-col">
										<input
											type="text"
											placeholder="ex. 'Integrative Programming'"
											value={course_title}
											onChange={(e) => setCourseTitle(e.target.value)}
											className={`${
												isEmpty
													? "border border-red-500 text-xs px-4 h-10 w-full lg:w-[300px] rounded outline-none"
													: "border border-primaryColor text-xs px-4 h-10 w-full lg:w-[300px] rounded outline-none"
											}`}
										/>
										{titleError ? (
											<div className="pt-1 text-xs text-red-600 flex items-center gap-1">
												<BiSolidErrorCircle />
												<p>This field is required</p>
											</div>
										) : (
											""
										)}
									</div>
								</div>
							</div>
							{/* here  */}
							<div className="flex items-center gap-8 pt-5">
								<div className="flex flex-col">
									<label htmlFor="program" className="text-sm text-primaryColor">
										Program
									</label>
									<div>
										<select
											id="program"
											name="program"
											value={course_program}
											onChange={(e) => setCourseProgram(e.target.value)}
											className={`${
												isEmpty
													? "border border-red-500 text-xs text-primaryColor px-4 h-10 w-full lg:w-[300px] rounded outline-none"
													: "border border-primaryColor text-xs text-primaryColor px-4 h-10 w-full lg:w-[300px] rounded outline-none"
											}`}>
											<option className="text-xs text-primaryColor">
												Select course program
											</option>
											<option
												value="Information Technology"
												className="text-xs text-primaryColor">
												Information Technology
											</option>
											<option
												value="Computer Science"
												className="text-xs text-primaryColor">
												Computer Science
											</option>
											<option
												value="Information System"
												className="text-xs text-primaryColor">
												Information System
											</option>
										</select>
										{programError ? (
											<div className="pt-1 text-xs text-red-600 flex items-center gap-1">
												<BiSolidErrorCircle />
												<p>This field is required</p>
											</div>
										) : (
											""
										)}
									</div>
								</div>
								<div className="flex flex-col">
									<label htmlFor="" className="text-sm text-primaryColor">
										Header image
									</label>
									<input
										type="text"
										placeholder="Use copy image address on online images"
										value={headerUrl}
										onChange={(e) => setHeaderUrl(e.target.value)}
										className={`${
											isEmpty
												? "border border-red-500 text-xs px-4 h-10 w-full lg:w-[300px] rounded outline-none"
												: "border border-primaryColor text-xs px-4 h-10 w-full lg:w-[300px] rounded outline-none"
										}`}
									/>
								</div>
							</div>
							<div className="pt-5 flex flex-col">
								<label htmlFor="" className="text-sm text-primaryColor">
									Description:
								</label>
								<div className="flex flex-col">
									<div className="pt-2 w-full">
										<textarea
											placeholder="Description"
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											className="border border-primaryColor text-xs h-[80px] rounded p-5 outline-none w-full lg:w-[630px] "
										/>
									</div>
									<div>
										{descriptionError ? (
											<div className="pt-1 text-xs text-red-600 flex items-center gap-1">
												<BiSolidErrorCircle />
												<p>This field is required</p>
											</div>
										) : (
											""
										)}
									</div>
								</div>
							</div>
						</div>
					</form>
					<div className="flex justify-end gap-2">
						<button
							onClick={onClose}
							className="mt-4 border border-red-500 text-red-500 rounded px-4 py-2 text-xs">
							cancel
						</button>
						<button
							onClick={handleSubmitUpdate}
							className="mt-4 bg-blue-500 text-white text-xs px-4 py-2 rounded">
							update
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
