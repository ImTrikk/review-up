import React, { useRef, useState } from "react";
import { BsFillFileEarmarkArrowUpFill } from "react-icons/bs";

import fileDefault from "/static/images/file-blank-solid-240.png";
import fileCSS from "/static/images/file-css-solid-240.png";
import filePdf from "/static/images/file-pdf-solid-240.png";
import filePng from "/static/images/file-png-solid-240.png";
import filePpts from "/static/icons/PPT.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DragDropFile = (props) => {
	const wrapperRef = useRef(null);

	const ImageConfig = {
		default: fileDefault,
		pdf: filePdf,
		png: filePng,
		css: fileCSS,
		pptx: filePpts,
	};
	const [fileList, setFileList] = useState([]);

	const onDragEnter = (e) => {
		e.preventDefault();
		wrapperRef.current.classList.add("dragover");
	};

	const onDrop = (e) => {
		e.preventDefault();
		wrapperRef.current.classList.remove("dragover");
		const newFiles = Array.from(e.dataTransfer.files);

		// Validate file types
		validateAndAddFiles(newFiles);
	};

	const onFileDrop = (e) => {
		e.preventDefault();
		const newFiles = Array.from(e.target.files);

		// Validate file types
		validateAndAddFiles(newFiles);
	};

	const validateAndAddFiles = (newFiles) => {
		const allowedFileExtensions = [
			"png",
			"jpeg",
			"jpg",
			"docx",
			"pptx",
			"xlsx",
			"pdf",
		];

		// Check if each file has an allowed extension
		const isSupportedFiles = newFiles.every((file) => {
			const fileExtension = file.name.split(".").pop().toLowerCase();
			return allowedFileExtensions.includes(fileExtension);
		});

		if (!isSupportedFiles) {
			toast.error("Unsupported file type selected.");
			return;
		}

		if (newFiles.length > 0) {
			const updatedList = [...fileList, ...newFiles];
			setFileList(updatedList);
			props.onFileChange(updatedList); // Call the callback here
		}	
	};

	const fileRemove = (file) => {
		const updatedList = [...fileList];
		updatedList.splice(fileList.indexOf(file), 1);
		setFileList(updatedList);
		props.onFileChange(updatedList);
	};

	return (
		<>
			<form encType="multipart/form-data">
				<ToastContainer />
				<div
					ref={wrapperRef}
					className="relative text-center p-5"
					onDragEnter={onDragEnter}
					// onDragLeave={onDragLeave}
					onDrop={onDrop}>
					<label
						htmlFor="file"
						className="relative cursor-pointer p-10 flex flex-col items-center justify-center border border-dashed border-blue-700 rounded"
						onDragOver={(e) => e.preventDefault()} // Prevent the default behavior
					>
						{/* <BsFillCloudArrowDownFill size={80} className="text-blue-400" /> */}
						<BsFillFileEarmarkArrowUpFill size={80} className="text-blue-400" />
						<input
							type="file"
							name="file"
							className="opacity-0 text-xs pointer-events-none"
							id="file"
							onChange={onFileDrop} // Trigger file selection on input change
						/>
						<p className="text-blue-500 text-xs">
							Drag and drop your reviewers here or click here and select a file
						</p>
					</label>
				</div>
			</form>
			<div className="px-5 mb-5">
				<p className="text-xs font-light text-gray-400">
					Post reviewer with the file extensions [.pdf , doxc, doc, .pptx, .png,
					.jpeg]
				</p>
				<p className="text-xs font-light text-gray-400 mt-2">
					Post only files <span className="text-red-500">less than 4.5 mb</span> for the total payload size
					upload
				</p>
			</div>
			{fileList.length > 0 ? (
				<div className="px-5 pb-5">
					<p className="font-semibold text-xs text-gray-600 pt-2">Ready to upload</p>
					{fileList.map((item, index) => (
						<div key={index} className="pt-2 flex">
							<img
								src={ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]}
								className="w-14"
							/>
							<div className="p-4 w-full bg-blue-100 rounded-md flex items-center justify-between">
								<div className="w-[170px] overflow-hidden">
									<p className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
										{item.name}
									</p>
									<p className="text-xs text-gray-500">{item.size} B</p>
								</div>
								<p
									className="text-red-500 text-xs font-bold h-[30px] w-[30px] bg-red-200 flex items-center justify-center p-4 rounded-full text-md cursor-pointer"
									onClick={() => fileRemove(item)}>
									x
								</p>
							</div>
						</div>
					))}
				</div>
			) : null}
		</>
	);
};
