import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";
import { CreateButton } from "../../components/CreateButton";
import { ReviewModuleCard } from "../../components/ReviewModuleCard";
import { useEffect } from "react";
import { buildUrl } from "../../utils/buildUrl";
import Header from "../../components/header/Header";

export const Courses = () => {
	const [isEmpty, setIsEmpty] = useState(null);

	const handleIsEmptyChange = (value) => {
		if (!value) {
			setIsEmpty(true);
		}
	};

	return (
		<>
			<div className="">
				<SideBar />

				<Header
					title={"Courses"}
					description="All available courses posted online by different users from different
								programs"
				/>
				<div className="ml-[10px] lg:ml-[210px]">
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
