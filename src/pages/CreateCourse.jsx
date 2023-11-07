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

export const CreateCourse = () => {
	let first_name = localStorage.getItem("first_name");
	let last_name = localStorage.getItem("last_name");
	const fileTypes = ["JPG", "PNG", "GIF"];

	const [files, setFiles] = useState([]);
	const [notes, setNotes] = useState([]);

	const [fileList, setFileList] = useState([]);
	const [noteList, setNoteList] = useState([]);

	const user_id = localStorage.getItem("user_id");


	const onFileChange = (files) => {	
		const fileData = files.map((file) => ({
			name: file.name,
			size: file.size,
			type: file.type,
			lastModified: file.lastModified,
		}));
		setFileList(fileData);
	};

	const onNotesChange = (files) => {
		const fileData = files.map((file) => ({
			name: file.name,
			size: file.size,
			type: file.type,
			lastModified: file.lastModified,
		}));
		setNoteList(fileData);
	};

	const [course_code, setCourseCode] = useState("");
	const [course_title, setCourseTitle] = useState("");
	const [course_category, setCourseCategory] = useState("");
	const [description, setDescription] = useState("");

	const handleCreateCourse = async (e) => {
		e.preventDefault();
		const data = {
			course_code,
			course_title,
			course_category,
			description,
			fileList,
			noteList,
			user_id,
		};
		try {
			await fetch(buildUrl("/auth/create-course"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).then((res) => {
				if (res.status === 201) {
					return res.json().then((data) => {
						toast.success("Course created!");
					});
				} else {
					return res.json().then((data) => {
						console.log(data)
					toast.error("There was a problem creating course");
					})
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="">
				<ToastContainer />
				<SideBar />
				<div className="bg-primaryColor w-full h-[140px]">
					<div className="ml-[220px] h-full grid items-end">
						<div className="pb-10">
							<h1 className="text-white text-x3l font-bold">Create Course</h1>
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
							<div className="border border-primaryColor h-autO rounded relative">
								<div className="p-5">
									<form action="">
										<div className="flex items-center gap-2 py-2">
											<label htmlFor="" className="text-sm font-medium text-primaryColor">
												Course Code:
											</label>
											<input
												type="text"
												placeholder="ex. 'IT109'"
												value={course_code}
												onChange={(e) => setCourseCode(e.target.value)}
												className="border border-primaryColor text-xs px-4 h-10 rounded outline-none"
											/>
										</div>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-4">
												<div className="flex items-center justify-between gap-4">
													<label
														htmlFor=""
														className="text-sm font-medium text-primaryColor">
														Course Title:
													</label>
													<input
														type="text"
														placeholder="ex. 'Integrative Programming'"
														value={course_title}
														onChange={(e) => setCourseTitle(e.target.value)}
														className="border border-primaryColor text-xs px-4 h-10 rounded outline-none"
													/>
												</div>
												<div className="flex items-center justify-between gap-2">
													<label
														htmlFor=""
														className="text-sm font-medium text-primaryColor">
														Category:
													</label>
													{/* add drop dox component here for easy categorizing */}
													<input
														type="text"
														placeholder="ex. Information Technology"
														value={course_category}
														onChange={(e) => setCourseCategory(e.target.value)}
														className="border border-primaryColor text-xs px-4 h-10 rounded outline-none"
													/>
												</div>
											</div>
											<div className="flex items-center gap-1">
												<div className="bg-primaryColor px-4 rounded text-white text-sm h-10 flex items-center gap-2">
													<AiFillPlusCircle size={16} className="text-white" />
													<button>Notes</button>
												</div>
												<div className="bg-primaryColor px-4 rounded text-white text-sm h-10 flex items-center gap-2">
													<AiFillPlusCircle size={16} className="text-white" />
													<button>Links</button>
												</div>
												<div className="bg-primaryColor px-4 rounded text-white text-sm h-10 flex items-center gap-2">
													<AiFillPlusCircle size={16} className="text-white" />
													<button>Quiz</button>
												</div>
											</div>
										</div>
										<div className="pt-5 flex flex-col">
											<label htmlFor="" className="text-sm text-primaryColor">
												Description:
											</label>
											<div className="pt-2 w-full">
												<textarea
													placeholder="Description"
													value={description}
													onChange={(e) => setDescription(e.target.value)}
													className="border border-primaryColor text-xs h-[80px] rounded p-5 outline-none w-full "
												/>
											</div>
										</div>
										<div className="flex gap-10">
											<div className="w-[350px] h-auto bg-white shadow rounded">
												<DragDropFile onFileChange={(files) => onFileChange(files)} />
											</div>
											<div className="w-[350px] h-auto bg-white shadow rounded">
												<NotesDragDrop onNotesChange={(notes) => onNotesChange(notes)} />
											</div>
										</div>
									</form>
									<div className="p-5 absolute bottom-0 right-0">
										<div className="bg-primaryColor px-4 rounded h-10 flex items-center">
											<button onClick={handleCreateCourse} className="text-white text-xs">
												Create
											</button>
										</div>
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
