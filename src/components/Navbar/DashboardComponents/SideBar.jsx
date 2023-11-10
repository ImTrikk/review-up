import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { BiBookmarkAltPlus } from "react-icons/bi";
import { BiArchiveIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { buildUrl } from "../../../utils/buildUrl";

export const SideBar = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		toast.info("Logging out...");

		setTimeout(async () => {
			localStorage.removeItem("token");
			localStorage.removeItem("first_name");
			localStorage.removeItem("last_name");
			localStorage.removeItem("phone");
			localStorage.removeItem("user_id");
			localStorage.removeItem("email");

			await fetch(buildUrl("/auth/logout"), {
				method: "POST",
			}).then((res) => {
				if (res.ok) {
					toast.success("Success logout!");
					setTimeout(() => {
						navigate("/");
					}, 5000);
				} else {
					toast.error("Internal server error");
				}
			});
		}, 3000);
	};

	return (
		<>
			<div className="fixed bg-white h-screen w-[200px] shadow-lg">
				<ToastContainer />
				<div className="relative h-screen">
					<div className="flex items-center gap-2 p-10">
						<img src="/static/images/mainlogo.png" alt="" className="w-[20px]" />
						<div className="font-black text-primaryColor text-lg">ReviewUP</div>
					</div>
					<div className="mt-2 h-auto">
						<div className="px-10 pb-2">
							<p className="text-xs text-gray-400">Menu</p>
						</div>
						<div>
							<NavLink to="/dashboard">
								{({ isActive }) => (
									<div
										className={`border border-gray-100 h-10 text-primaryColor ${
											isActive ? "bg-primaryColor text-white" : ""
										}`}>
										<div className="px-10 flex items-center h-full gap-2">
											<AiFillHome size={15} />
											<p className="text-xs">Dashboard</p>
										</div>
									</div>
								)}
							</NavLink>
							<NavLink to="/courses">
								{({ isActive }) => (
									<div
										className={`border border-gray-100 h-10 text-primaryColor ${
											isActive ? "bg-primaryColor text-white" : ""
										}`}>
										<div className="px-10 flex items-center h-full gap-2">
											<BsJournalBookmarkFill size={15} />
											<p className="text-xs">Courses</p>
										</div>
									</div>
								)}
							</NavLink>
							<NavLink to="/my-courses">
								{({ isActive }) => (
									<div
										className={`border border-gray-100 h-10 text-primaryColor ${
											isActive ? "bg-primaryColor text-white" : ""
										}`}>
										<div className="px-10 flex items-center h-full gap-2">
											<BiBookmarkAltPlus size={15} />
											<p className="text-xs">My courses</p>
										</div>
									</div>
								)}
							</NavLink>
							{/* <NavLink to="/archived">
								{({ isActive }) => (
									<div
										className={`border border-gray-100 h-10 text-primaryColor ${
											isActive ? "bg-primaryColor text-white" : ""
										}`}>
										<div className="px-10 flex items-center h-full gap-2">
											<BiArchiveIn size={15} />
											<p className="text-xs">Archived</p>
										</div>
									</div>
								)}
							</NavLink> */}
							<NavLink to="/profile">
								{({ isActive }) => (
									<div
										className={`border border-gray-100 h-10 text-primaryColor ${
											isActive ? "bg-primaryColor text-white" : ""
										}`}>
										<div className="px-10 flex items-center h-full gap-2">
											<CgProfile size={15} />
											<p className="text-xs">Profile</p>
										</div>
									</div>
								)}
							</NavLink>
							{/* <NavLink to="/settings">
								{({ isActive }) => (
									<div
										className={`border border-gray-100 h-10 text-primaryColor ${
											isActive ? "bg-primaryColor text-white" : ""
										}`}>
										<div className="px-10 flex items-center h-full gap-2">
											<IoSettingsOutline size={15} />
											<p className="text-xs">Settings</p>
										</div>
									</div>
								)}
							</NavLink> */}
						</div>
						<div className=" absolute bottom-5 left-0 right-0 px-4">
							<div className="flex items-center justify-between">
								<p className="text-xs text-gray-400">Need help?</p>
								<button
									onClick={handleLogout}
									className="text-xs text-white h-6 px-2 bg-primaryColor rounded">
									Logout
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
