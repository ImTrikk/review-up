import { CreateButton } from "../../components/CreateButton";
import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";
import { SavedCourseCard } from "../../components/SavedCourseCard";
import { useState } from "react";
import Header from "../../components/header/Header";

export const SavedCourses = () => {
	const [isEmpty, setIsEmpty] = useState(null);

	const handleIsEmpty = (value) => {
		setIsEmpty(value.length === 0);
	};

	return (
		<>
			<div className="">
				<SideBar />
				<Header
					title={"Saved"}
					description="Courses saved from different users online"
				/>
				<div className="ml-[10px] lg:ml-[210px]">
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
