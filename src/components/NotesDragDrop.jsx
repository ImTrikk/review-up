import React, { useRef, useState } from "react";
// import { BsFillCloudArrowDownFill } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";

import fileDefault from "/static/images/file-blank-solid-240.png";
import fileCSS from "/static/images/file-css-solid-240.png";
import filePdf from "/static/images/file-pdf-solid-240.png";
import filePng from "/static/images/file-png-solid-240.png";

export const NotesDragDrop = (notes) => {
	const wrapperRef = useRef(null);

	const ImageConfig = {
		default: fileDefault,
		pdf: filePdf,
		png: filePng,
		css: fileCSS,
	};

	const [noteList, setNoteList] = useState([]);

	const onDragEnter = (e) => {
		e.preventDefault();
		wrapperRef.current.classList.add("dragover");
	};

	const onDrop = (e) => {
		console.log("Thi is dropping");
		e.preventDefault();
		wrapperRef.current.classList.remove("dragover");
		const newFiles = Array.from(e.dataTransfer.files);
		if (newFiles.length > 0) {
			const updatedList = [...noteList, ...newFiles];
			setNoteList(updatedList);
			notes.onNotesChange(updatedList);
		}
	};

	const onFileDrop = (e) => {
		e.preventDefault();
		const newFiles = Array.from(e.target.files);
		if (newFiles.length > 0) {
			const updatedList = [...noteList, ...newFiles];
			setNoteList(updatedList);
			notes.onNotesChange(updatedList);
		}
	};

	const fileRemove = (file) => {
		const updatedList = [...noteList];
		updatedList.splice(noteList.indexOf(file), 1);
		setNoteList(updatedList);
		// notes.onFileChange(updatedList);
	};

	return (
		<>
			<div
				ref={wrapperRef}
				className="relative text-center p-5"
				onDragEnter={onDragEnter}
				// onDragLeave={onDragLeave}
				onDrop={onDrop}>
				<label
					htmlFor="noteInput"
					className="relative cursor-pointer p-10 flex flex-col items-center justify-center border border-dashed border-blue-700 rounded"
					onDragOver={(e) => e.preventDefault()} // Prevent the default behavior
				>
					<GiNotebook size={80} className="text-blue-400" />
					<input
						type="file"
						className="opacity-0 text-xs pointer-events-none"
						id="noteInput"
						onChange={onFileDrop}
					/>
					<p className="text-blue-500 text-xs">
						Drag and drop your notes here or click here and select a file
					</p>
				</label>
			</div>
			{noteList.length > 0 ? (
				<div className="px-5 pb-5">
					<p className="font-semibold text-sm text-gray-600">Ready to upload</p>
					{noteList.map((item, index) => (
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
