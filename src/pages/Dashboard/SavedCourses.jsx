import { CreateButton } from "../../components/CreateButton";
import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";
import { SavedCourseCard } from "../../components/SavedCourseCard";
import { useState } from "react";

export const SavedCourses = () => {
	const [isEmpty, setIsEmpty] = useState("");

	const handleIsEmpty = (value) => {
		setIsEmpty(value);
	};

	return (
		<>
			<div className="">
				<SideBar />
				<div className="bg-primaryColor w-full h-[140px] relative">
					<img
						src="/static/images/header.png"
						alt=""
						className="absolute w-full h-[140px]"
					/>
					<div className="ml-[220px] h-full grid items-end absolute z-10">
						<div className="pb-10">
							<h1 className="text-white text-3xl font-bold">Saved</h1>
							<p className="text-white text-sm">
								Courses saved from different users online
							</p>
						</div>
					</div>
				</div>
				<div className="ml-[200px]">
					<div className="p-8">
						<h1 className="text-lg font-bold text-primaryColor">Saved courses</h1>
						<div className="py-3">
							<hr className="border-1 border-primaryColor" />
						</div>
						<div>
							<SavedCourseCard handleIsEmpty={handleIsEmpty} />
						</div>
					</div>
				</div>
				<CreateButton />
			</div>
		</>
	);
};
