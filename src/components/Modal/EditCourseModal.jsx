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

	return (
		<>
			<div
				className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center `}>
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
									className="border border-primaryColor w-full h-10 rounded px-4 outline-none	"
								/>
								<input
									type="text"
									className="border border-primaryColor w-full h-10 rounded px-4 outline-none	"
								/>
								<input
									type="text"
									className="border border-primaryColor w-full h-10 rounded px-4 outline-none	"
								/>
								<input
									type="text"
									className="border border-primaryColor w-full h-10 rounded px-4 outline-none	"
								/>
							</div>
							<NotesDragDrop onFileChange={(files) => onFileChange(files)} />
						</div>
						<QuizModal />
					</form>
					<div className="flex justify-end">
						<button
							onClick={handleSubmitUpdate}
							className="mt-4 bg-blue-500 text-white text-xs px-4 py-2 rounded">
							Update
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
