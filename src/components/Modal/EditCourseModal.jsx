import { useState } from "react";
import { NotesDragDrop } from "../NotesDragDrop";
import { QuizModal } from "./QuizModal";

export const EditCourseModal = ({ onClose, onSave, initialData }) => {
	// implement hanlde sugmit new course information
	const [fileList, setFileList] = useState([]);

	const handleSubmitUpdate = () => {
		onClose();
	};

	const onFileChange = (files) => {
		setFileList(files);
	};

	const [formData, setFormData] = useState({
		// Initialize with the existing data
		course_code: initialData.course_code || "",
		course_title: initialData.course_title || "",
		course_program: initialData.course_program || "",
		description: initialData.description || "",
		header_url: initialData.header_url || "",
		// Add more fields as needed
	});

	return (
		<>
			<div
				className={`fixed z-40 top-0 left-0 w-full h-screen flex items-center justify-center `}>
				<div
					className="fixed top-0 left-0 w-full h-full backdrop-filter backdrop-blur-sm"
					style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}></div>

				<div className="border border-gray-300 bg-white w-[700px] h-[650px]  rounded p-5 relative overflow-y-auto">
					<h1 className="text-lg font-bold text-primaryColor mb-4">
						Edit Course Module
					</h1>
					<div className="py-2">
						<hr />
					</div>
					<form action="">
						<div className="flex">
							<div className="w-full space-y-4 p-5 flex flex-col">
								<input
									type="text"
									value={formData.course_code}
									onChange={(e) =>
										setFormData({ ...formData, course_code: e.target.value })
									}
									placeholder="Course Code"
									className="border border-primaryColor w-full h-10 rounded px-4 text-xs  outline-none	"
								/>
								<input
									type="text"
									value={formData.course_title}
									onChange={(e) =>
										setFormData({ ...formData, course_title: e.target.value })
									}
									placeholder="Course Title"
									className="border border-primaryColor w-full h-10 rounded px-4 text-xs  outline-none	"
								/>
								<input
									type="text"
									value={formData.course_program}
									onChange={(e) =>
										setFormData({ ...formData, course_program: e.target.value })
									}
									placeholder="Course Program"
									className="border border-primaryColor w-full h-10 rounded px-4 text-xs  outline-none	"
								/>
								<input
									type="text"
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
									placeholder="Description"
									className="border border-primaryColor w-full h-10 rounded px-4 text-xs  outline-none	"
								/>
								<input
									type="text"
									value={formData.header_url}
									onChange={(e) =>
										setFormData({ ...formData, header_url: e.target.value })
									}
									placeholder="Header URL: use copy image address"
									className="border border-primaryColor w-full h-10 rounded px-4 text-xs  outline-none	"
								/>
							</div>
							<NotesDragDrop onFileChange={(files) => onFileChange(files)} />
						</div>
						<QuizModal />
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
