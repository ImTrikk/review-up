import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";
import { BsSearch } from "react-icons/bs";
import { ReviewModuleCard } from "../../components/ReviewModuleCard";
import { CreateButton } from "../../components/CreateButton";
import { useState } from "react";

const Dashboard = () => {
	let first_name = localStorage.getItem("first_name");
	let last_name = localStorage.getItem("last_name");

	const [isEmpty, setIsEmpty] = useState("");

	const handleIsEmptyChange = (value) => {
		setIsEmpty(value);
	};

	return (
		<>
			<div className="absol">
				<SideBar />
				<div className="bg-primaryColor w-full h-[140px] relative">
					<img
						src="/static/images/header.png"
						alt=""
						className="absolute w-full h-[140px]"
					/>
					<div className="ml-[240px] h-full grid items-end absolute z-10">
						<div className="pb-10">
							<h1 className="text-white text-3xl font-bold">Dashboard</h1>
							<p className="text-white text-sm">
								Keep track on the save reviewers to keep learning and improving
							</p>
						</div>
					</div>
				</div>
				<div className="ml-[210px]">
					<div className="p-8">
						{/* <div className="flex items-start justify-between">
							<h1 className="font-bold text-xl text-primaryColor">
								Welcome back, <span className="font-bold">{first_name + "!"}</span>
							</h1>
						</div> */}
						{/* <div className="pt-2">
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
export default Dashboard;
