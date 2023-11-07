import React, { useRef, useState } from "react";
// import { BsFillCloudArrowDownFill } from "react-icons/bs";
import { BsFillFileEarmarkArrowUpFill } from "react-icons/bs";

import fileDefault from "/static/images/file-blank-solid-240.png";
import fileCSS from "/static/images/file-css-solid-240.png";
import filePdf from "/static/images/file-pdf-solid-240.png";
import filePng from "/static/images/file-png-solid-240.png";

export const DragDropFile = (props) => {
	const wrapperRef = useRef(null);

	const ImageConfig = {
		default: fileDefault,
		pdf: filePdf,
		png: filePng,
		css: fileCSS,
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
		if (newFiles.length > 0) {
			const updatedList = [...fileList, ...newFiles];
			setFileList(updatedList);
			props.onFileChange(updatedList);
		}
	};



	const onFileDrop = (e) => {
		e.preventDefault();
		const newFiles = Array.from(e.target.files);
		if (newFiles.length > 0) {
			const updatedList = [...fileList, ...newFiles];
			setFileList(updatedList);
			props.onFileChange(updatedList);
		}
	};

	const fileRemove = (file) => {
		const updatedList = [...fileList];
		updatedList.splice(fileList.indexOf(file), 1);
		setFileList(updatedList);
		props.onFileChange(updatedList);
	};

	// const onFileChange = (files) => {
	// 	console.log("Files received:", files); // This line logs the received files
	// 	const fileData = files.map((file) => ({
	// 		name: file.name,
	// 		size: file.size,
	// 		type: file.type,
	// 		lastModified: file.lastModified,
	// 	}));
	// 	props.onFileChange(fileData); // This line sends the relevant file information to the callback
	// 	setFileList(files); // Update the state with File objects
	// };

	return (
		<>
			<form encType="multipart/form-data">
				<div
					ref={wrapperRef}
					className="relative text-center p-5"
					onDragEnter={onDragEnter}
					// onDragLeave={onDragLeave}
					onDrop={onDrop}>
					<label
						htmlFor="fileInput"
						className="relative cursor-pointer p-10 flex flex-col items-center justify-center border border-dashed border-blue-700 rounded"
						onDragOver={(e) => e.preventDefault()} // Prevent the default behavior
					>
						{/* <BsFillCloudArrowDownFill size={80} className="text-blue-400" /> */}
						<BsFillFileEarmarkArrowUpFill size={80} className="text-blue-400" />
						<input
							type="file"
							name="file"
							className="opacity-0 text-xs pointer-events-none"
							id="fileInput"
							onChange={onFileDrop} // Trigger file selection on input change
						/>
						<p className="text-blue-500 text-xs">
							Drag and drop your reviewers here or click here and select a file
						</p>
					</label>
				</div>
			</form>
			{fileList.length > 0 ? (
				<div className="px-5 pb-5">
					<p className="font-semibold text-sm text-gray-600">Ready to upload</p>
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
									<p className="text-xs text-gray-500">{item.size}B</p>
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
