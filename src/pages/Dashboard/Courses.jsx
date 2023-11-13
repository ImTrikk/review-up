import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";
import { CreateButton } from "../../components/CreateButton";
import { ReviewModuleCard } from "../../components/ReviewModuleCard";
import { useEffect } from "react";
import { buildUrl } from "../../utils/buildUrl";

export const Courses = () => {

		const [isEmpty, setIsEmpty] = useState("");

		const handleIsEmptyChange = (value) => {
			setIsEmpty(value);
		};
	
	return (
		<>
			<div className="">
				<SideBar />
				<div className="bg-primaryColor w-full h-[140px]">
					<div className="ml-[220px] h-full grid items-end">
						<div className="pb-10">
							<h1 className="text-white text-3xl font-bold">Courses</h1>
							<p className="text-white text-sm">
								Keep track on the save reviewers to keep learning and improving
							</p>
						</div>
					</div>
				</div>
				<div className="ml-[200px]">
					<div className="p-8">
						<h1 className="font-bold text-xl text-primaryColor">
							Courses with reviewers
						</h1>
						<div className="pt-2">
							<hr className="border-1 border-primaryColor" />
						</div>
						<div className="pt-10">
							<div className="pt-5">
								{isEmpty ? (
									<div className="flex items-center justify-center">
										<img src="/static/images/empty.jpg" alt="" className="w-[700px]" />
									</div>
								) : (
									<ReviewModuleCard onIsEmptyChange={handleIsEmptyChange} />
								)}
							</div>
						</div>
					</div>
				</div>
				<CreateButton />
			</div>
		</>
	);
};
