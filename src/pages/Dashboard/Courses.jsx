import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";
import { CreateButton } from "../../components/CreateButton";
import { ReviewModuleCard } from "../../components/ReviewModuleCard";
import { useEffect } from "react";
import { buildUrl } from "../../utils/buildUrl";

export const Courses = () => {
	const [isEmpty, setIsEmpty] = useState(null);

	const handleIsEmptyChange = (value) => {
		setIsEmpty(value.length === 0);
	};

	return (
		<>
			<div className="bg-[#f2f2f2]">
				<SideBar />
				<div className="bg-primaryColor w-full h-[140px] relative">
					<img
						src="/static/images/header.png"
						alt=""
						className="absolute w-full h-[140px]"
					/>
					<div className="ml-[240px] h-full grid items-end absolute z-10">
						<div className="pb-10">
							<h1 className="text-white text-3xl font-bold">Courses</h1>
							<p className="text-white text-sm">
								All available courses posted online by different users from different
								programs
							</p>
						</div>
					</div>
				</div>
				<div className="ml-[210px]">
					<div className="p-8">
						{/* <h1 className="font-bold text-xl text-primaryColor">
							Courses with reviewers
						</h1>
						<div className="pt-5">
							<hr className="border-1 border-primaryColor" />
						</div> */}
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
				<CreateButton />
			</div>
		</>
	);
};
