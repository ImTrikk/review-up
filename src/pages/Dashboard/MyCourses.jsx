import { CreateButton } from "../../components/CreateButton";
import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";
import { ReviewModuleCard } from "../../components/ReviewModuleCard";

export const MyCourses = () => {

	const user_id = localStorage.getItem("user_id");

	return (
		<>
			<div className="">
				<SideBar />
				<div className="bg-primaryColor w-full h-[140px]">
					<div className="ml-[220px] h-full grid items-end">
						<div className="pb-10">
							<h1 className="text-white text-3xl font-bold">Created Courses</h1>
							<p className="text-white text-sm">
								Keep track on the save reviewers to keep learning and improving
							</p>
						</div>
					</div>
				</div>
				<div className="ml-[200px]">
					<div className="p-8">
						<h1 className="text-lg font-bold text-primaryColor">My Courses</h1>
						<div className="py-3">
						<hr className="border-1 border-primaryColor" />
						</div>
						<div className="pt-5">
							<ReviewModuleCard user_id={user_id} />
						</div>
					</div>
				</div>
				<CreateButton />
			</div>
		</>
	);
};
