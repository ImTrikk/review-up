import { SideBar } from "../components/Navbar/DashboardComponents/SideBar";
import { BsSearch } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState } from "react";
import { buildUrl } from "../utils/buildUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import { FileUploader } from "react-drag-drop-files";
import { DragDropFile } from "../components/DragDropFile";
import { NotesDragDrop } from "../components/NotesDragDrop";
import { QuizModal } from "../components/Modal/QuizModal";
import { LinkResourcesModal } from "../components/Modal/LinkResourcesModal";
import { SessionNoticeModal } from "../components/Modal/SessionNoticeModal";
import { SuccessCreateCourse } from "../components/Modal/SuccessCreateCourse";
import { useNavigate } from "react-router-dom";
import { BiSolidErrorCircle } from "react-icons/bi";

export const CreateCourse = () => {
	const [course_code, setCourseCode] = useState("");
	const [course_title, setCourseTitle] = useState("");
	const [course_program, setCourseProgram] = useState("");
	const [description, setDescription] = useState("");
	const [headerUrl, setHeaderUrl] = useState("");

	let first_name = localStorage.getItem("first_name");
	let last_name = localStorage.getItem("last_name");
	let email = localStorage.getItem("email");

	const [quizModal, setQuizModal] = useState(false);
	const [linkModal, setLinkModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const user_id = localStorage.getItem("user_id");
	const [fileList, setFileList] = useState([]);
	const [isEmpty, setIsEmpty] = useState(false);

	// error handlers
	const [fieldRequired, setFieldRequired] = useState(true);
	const [codeError, setCodeError] = useState(false);
	const [titleError, setTitleError] = useState(false);
	const [programError, setProgramError] = useState(false);
	const [descriptionError, setDescriptionError] = useState(false);
	const [headerError, setHeaderError] = useState(false);
	const [fileListError, setFileListError] = useState(false);

	const onFileChange = (files) => {
		setFileList(files);
	};

	const navigator = useNavigate();

	const handleCreateCourse = async (e) => {
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
		if (fileList.length === 0) {
			setFileListError(true);
			setTimeout(() => {
				setFileListError(false);
			}, 5000);
		}
		if (
			!course_code == "" ||
			!course_title == "" ||
			!course_program == "" ||
			!description == "" ||
			!headerUrl == "" ||
			!fileList.length === 0
		) {
			const formData = new FormData();
			formData.append("course_code", course_code);
			formData.append("course_title", course_title);
			formData.append("course_program", course_program);
			formData.append("description", description);
			formData.append("user_id", user_id);
			formData.append("first_name", first_name);
			formData.append("last_name", last_name);
			formData.append("email", email);
			formData.append("header_url", headerUrl);
			// Append each selected file to the FormData
			fileList.forEach((file) => {
				formData.append("file", file);
			});

			try {
				let response = await fetch(buildUrl("/course/create-course"), {
					method: "POST",
					body: formData,
				});
				const data = await response.json();
				if (response.ok) {
					console.log(data);
					setSuccessModal(true);
					setTimeout(() => {
						setSuccessModal(false);
						navigator("/dashboard");
					}, 6000);
					toast.success("Course created!");
				} else {
					console.log(data);
					toast.error("There was a problem creating course");
				}
			} catch (err) {
				console.log(err);
				toast.error("There was a problem making course ");
			}
		}
	};

	return (
		<>
			<div className="relative">
				<ToastContainer />
				<div
					className={`fixed inset-0 flex items-center justify-center ${
						successModal ? "z-10" : "hidden"
					}`}>
					{successModal ? (
						<>
							<div className="fixed inset-0 bg-black opacity-50 z-50"></div>{" "}
							{/* Dark background */}
							<SuccessCreateCourse />
						</>
					) : (
						""
					)}
				</div>
				<SideBar />
				<div className="bg-primaryColor w-full h-[140px]">
					<div className="ml-[220px] h-full grid items-end">
						<div className="pb-10">
							<h1 className="text-white text-3xl font-bold">Create Course</h1>
							<p className="text-white text-sm">
								Create reviewers, drop down notes, and even
							</p>
						</div>
					</div>
				</div>
				<div className="ml-[200px]">
					<div className="p-8">
						<div className="flex items-start justify-between">
							<h1 className="font-bold text-xl text-primaryColor">Create</h1>
						</div>
						<div className="pt-2">
							<hr className="border-1 border-primaryColor" />
						</div>
						<div className="mt-10">
							<div className="border border-primaryColor rounded relative h-auto">
								<div className="p-5">
									<div className="flex gap-10">
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
													<div className="flex flex-col">
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
												<div className="flex items-center justify-between pt-5">
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
																<option value="it" className="text-xs text-primaryColor">
																	Information Technology
																</option>
																<option value="cs" className="text-xs text-primaryColor">
																	Computer Science
																</option>
																<option value="is" className="text-xs text-primaryColor">
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
												<div className="pt-5">
													<hr className="border-1 border-primaryColor" />
												</div>
												<div className="pt-10">
													<div className="flex items-center justify-between">
														<div>
															<h1 className="text-sm text-primaryColor">
																Make practice quiz?
															</h1>
															<p className="text-gray-600 text-xs">
																You can add this later on after creating the course
															</p>
														</div>
														{quizModal ? (
															<button
																onClick={() => setQuizModal(false)}
																type="button"
																className="bg-red-600 h-8 rounded px-4 text-xs text-white">
																Close
															</button>
														) : (
															<button
																onClick={() => setQuizModal(true)}
																type="button"
																className="bg-primaryColor h-8 rounded px-4 text-xs text-white">
																Add
															</button>
														)}
													</div>
													{quizModal ? <QuizModal /> : ""}
												</div>
												<div className="pt-5">
													<hr className="border-1 border-primaryColor" />
												</div>
												<div className="pt-10">
													<div className="flex items-center justify-between">
														<div>
															<h1 className="text-sm text-primaryColor">
																Add more resources?
															</h1>
															<p className="text-gray-600 text-xs">
																You can add this later on after creating the course
															</p>
														</div>
														{linkModal ? (
															<button
																onClick={() => setLinkModal(false)}
																type="button"
																className="bg-red-600 h-8 rounded px-4 text-xs text-white">
																Close
															</button>
														) : (
															<button
																onClick={() => setLinkModal(true)}
																type="button"
																className="bg-primaryColor h-8 rounded px-4 text-xs text-white">
																Add
															</button>
														)}
													</div>
													{linkModal ? <LinkResourcesModal /> : ""}
												</div>
											</div>
										</form>
										<div className="w-[600px] h-auto bg-white shadow rounded">
											<DragDropFile onFileChange={(files) => onFileChange(files)} />
											{fileListError ? (
												<div className="pt-1 ml-5 text-xs text-red-600 flex items-center gap-1">
													<BiSolidErrorCircle />
													<p>This field is required</p>
												</div>
											) : (
												""
											)}
										</div>
									</div>
									<div className=" flex items-center justify-end mt-10">
										<button
											onClick={handleCreateCourse}
											className="text-white bg-primaryColor px-4 rounded h-10 text-xs">
											Create
										</button>
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
