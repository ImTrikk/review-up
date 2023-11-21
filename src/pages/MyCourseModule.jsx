import { useEffect, useState } from "react";
import { SideBar } from "../components/Navbar/DashboardComponents/SideBar";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { buildUrl } from "../utils/buildUrl";
import { useNavigate, useParams } from "react-router-dom";
import { EditCourseModal } from "../components/Modal/EditCourseModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
//import icons

import pdf from "/static/icons/PDF.png";
import doc from "/static/icons/DOC.png";
import pptx from "/static/icons/PPT.png";
import jpg from "/static/icons/JPG.png";
import png from "/static/icons/PNG.png";

import LoadingBar from "react-top-loading-bar";
import { useRef } from "react";

export const MyCourseModule = () => {
	const [courseInfo, setCourseInfo] = useState([]);
	const [isEditOpen, setIsEditOpen] = useState(false);

	const { id } = useParams();

	const getCourseInfo = async () => {
		try {
			const response = await fetch(buildUrl(`/course/get-course-info/${id}`), {
				method: "GET",
			});
			const data = await response.json();
			if (response.ok) {
				console.log(data);
				setCourseInfo(data);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
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
		console.log("Saving edited data:", editedData);
	};

	const navigator = useNavigate();

	const loadingBar = useRef(null);

	const handleDelete = async () => {
		loadingBar.current.continuousStart(50);
		await fetch(buildUrl(`/course/delete-course/${id}`), {
			method: "DELETE",
		}).then((res) => {
			return res.json().then((data) => {
				if (res.ok) {
					console.log(data);
					loadingBar.current.continuousStart(60);
					setTimeout(() => {
						loadingBar.current.complete();
						setTimeout(() => {
							navigator("/my-courses");
						}, 1200);
					}, 1000);	
				} else {
					loadingBar.current.complete();
					toast.error(data.message);
				}
			});
		});
	};

	useEffect(() => {
		getCourseInfo();
	}, []);

	return (
		<>
			<div className="bg-[#f2f2f2]">
				<SideBar />
				<LoadingBar height={7} color="#E44F48" ref={loadingBar} />
				<ToastContainer autoClose={2000} />
				{isEditOpen ? (
					<EditCourseModal
						onClose={closeEditModal}
						onSave={saveEditedData}
						initialData={courseInfo}
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
						<div className="ml-[220px]">
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
								onClick={handleDelete}
								className="bg-red-500 h-10 rounded px-5 text-white text-xs">
								Delete Course
							</button>
						</div>
					</div>
				</div>
				<div className="ml-[200px]">
					<div className="p-8">
						<div>
							<div className="py-5 flex flex-wrap items-center gap-5">
								{courseInfo.fileDownloadURLs &&
									courseInfo.fileDownloadURLs.map((url, urlIndex) => (
										<div
											key={urlIndex}
											className="h-56 w-56 shadow flex flex-col items-center justify-center">
											{/* Display or use the downloadURL as needed */}
											<img src={fileIconType(url)} alt="" className="w-[100px]" />
											<div></div>
											<a
												href={url}
												target="_blank"
												rel="noopener noreferrer"
												className="text-xs font font-semibold text-primaryColor pt-2">
												{getFileNameFromUrl(url)}
												{/* {urlIndex + 1} */}
											</a>
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
