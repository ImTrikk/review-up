import { CreateButton } from "../../components/CreateButton";
import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";
import { SavedCourseCard } from "../../components/SavedCourseCard";
import { useState } from "react";

export const SavedCourses = () => {
	const [isEmpty, setIsEmpty] = useState(null);

	const handleIsEmpty = (value) => {
		setIsEmpty(value.length === 0);
	};

	return (
		<>
			<div className="bg-[#f2f2f2] h-screen">
				<SideBar />
				<div className="bg-primaryColor w-full h-[140px] relative">
					<img
						src="/static/images/header.png"
						alt=""
						className="absolute w-full h-[140px]"
					/>
					<div className="ml-[240px] h-full grid items-end absolute z-10">
						<div className="pb-10">
							<h1 className="text-white text-3xl font-bold">Saved</h1>
							<p className="text-white text-sm">
								Courses saved from different users online
							</p>
						</div>
					</div>
				</div>
				<div className="ml-[210px]">
					<div className="p-8">
						<div className="pt-5">
							{isEmpty ? (
								<div className="flex items-center justify-center">
									<img src="/static/images/empty.jpg" alt="" className="w-[700px]" />
								</div>
							) : (
								<SavedCourseCard onIsEmptyChange={handleIsEmpty} />
							)}
						</div>
					</div>
				</div>
				<CreateButton />
			</div>
		</>
	);
};
