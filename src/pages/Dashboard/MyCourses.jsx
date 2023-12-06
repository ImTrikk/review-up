import { useState } from "react";
import { CreateButton } from "../../components/CreateButton";
import { MyCourseCard } from "../../components/MyCourseCard";
import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";
import { ReviewModuleCard } from "../../components/ReviewModuleCard";
import Header from "../../components/header/Header";

export const MyCourses = () => {
	const user_id = localStorage.getItem("user_id");
	const [isEmpty, setIsEmpty] = useState(null);

	const handleIsEmpty = (value) => {
		if (!value) {
			setIsEmpty(true);
		}
	};

	return (
		<>
			<div className="">
				<SideBar />
				<Header
					title={"MyCourse"}
					description={
						"Keep track on the save reviewers to keep learning and improving"
					}
				/>
				<div className="ml:ml-[10px] lg:ml-[210px]">
					<div className="p-8">
						<div className="pt-5">
							{isEmpty ? (
								<div className="flex items-center justify-center">
									<img src="/static/images/empty.jpg" alt="" className="w-[700px]" />
								</div>
							) : (
								<MyCourseCard onIsEmptyChange={handleIsEmpty} />
							)}
						</div>
					</div>
				</div>
				<CreateButton />
			</div>
		</>
	);
};
