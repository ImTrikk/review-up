import { Link } from "react-router-dom";
import { SideBar } from "../../components/Navbar/DashboardComponents/SideBar";
import { BsArrowRight } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useState } from "react";
import { stringAvatar } from "../../utils/StringAvatar";
import Header from "../../components/header/Header";
import { LogsModal } from "../../components/Modal/LogsModal";
import { DeleteAccountModal } from "../../components/Modal/DeleteAccountModal";
// BsArrowRight

export const Profile = () => {
	const [edit, setEdit] = useState(false);
	const [isLogOpen, setLogOpen] = useState(false);
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

	const handleClick = () => {
		setEdit(!edit);
	};

	const first_name = localStorage.getItem("first_name");
	const last_name = localStorage.getItem("last_name");
	const email = localStorage.getItem("email");
	const StringAvatar = stringAvatar(first_name);

	const handleOpenLogs = () => {
		setLogOpen(true);
	};

	const onCloseLogs = (value) => {
		if (value) {
			setLogOpen(false);
		}
	};

	// handle opening delete account modal
	const handleOpenDeleteModal = () => {
		setDeleteModalOpen(true);
	};

	// closing delete modal
	const onChangeDeleteModal = (value) => { 
		if (value) { 
			setDeleteModalOpen(false)
		}
	}



	return (
		<>
			<div className="">
				<SideBar />
				<Header title={"Profile"} description={"Update your account profile"} />
				<div className="ml-[80px] mr-[20px] lg:ml-[240px]">
					<div className="w-full lg:max-w-[900px] h-full be rounded-[10px] shadow border border-black border-opacity-10 mt-10 ml-2 pt-6 ">
						<div className="flex gap-3 border-b-2 items-center px-6 shadow-sm pb-8">
							<div>{StringAvatar}</div>
							<div className="h-fit">
								<h3 className="text-[20px] font-semibold text-[#0C046B]">
									{first_name} {last_name}
								</h3>
								<p className="text-xs font-normal">{email}</p>
							</div>
						</div>
						<div>
							<div className="w-full h-auto px-6 py-9 flex flex-col gap-6">
								<div className=" flex">
									<h3 className="w-[92%] text-[17px] font-semibold text-[#0C046B]">
										Personal Information
									</h3>
									<button className="flex items-center gap-1" onClick={handleClick}>
										<p className="text-gray-500 text-sm">Edit</p>
										<BiEdit size={16} style={{ color: "gray" }} />
									</button>
								</div>
								<div>
									<hr />
								</div>
								<div className="flex gap-[80px] ">
									<div className="">
										<h3 className="text-[15px] font-semibold text-[#0C046B]">
											First name
										</h3>
										<p className="text-[13px] font-[500] text-[#0C046B]">{first_name}</p>
									</div>
									<div>
										<h3 className="text-[15px] font-semibold text-[#0C046B]">
											Last name
										</h3>
										<p className="text-[13px] font-[500] text-[#0C046B]">{last_name}</p>
									</div>
								</div>
								<div>
									<h3 className="text-[15px] font-semibold text-[#0C046B]">Email</h3>
									<p className="text-[13px] font-[500] text-[#0C046B]">{email}</p>
								</div>
								<div className="pt-5">
									<h1 className="font-[500] text-[#0C046B]">Reviewers Made</h1>
									<hr />
								</div>
								<div className="flex items-center gap-4">
									<div className="w-[68px] h-[57px] bg-indigo-500 rounded-[5px] flex items-center justify-center text-white font-bold text-xl">
										3
									</div>
									<Link to="/my-courses">
										<div className="flex gap-2 items-center text-gray-400 text-sm">
											<span>See reviewers</span>
											<BsArrowRight size={16} style={{ color: "light" }} />
										</div>
									</Link>
								</div>
								<div className="pt-5">
									<h1 className="font-[500] text-[#0C046B]">User logs</h1>
									<hr />
								</div>
								<div className="flex">
									<div
										onClick={handleOpenLogs}
										className="flex items-center justify-center h-12 px-4 rounded border border-primaryColor cursor-pointer hover:bg-primaryColor hover:text-white">
										<h1 className="text-xs">open your logs</h1>
									</div>
								</div>
								{isLogOpen ? (
									<LogsModal onCloseLogs={(value) => onCloseLogs(value)} />
								) : (
									""
								)}
								<div className="flex justify-end">
									<button
										onClick={handleOpenDeleteModal}
										className="bg-red-500 px-2 h-10 rounded text-xs  text-white">
										Delete account
									</button>
								</div>
								{isDeleteModalOpen ? (
									<DeleteAccountModal
										onChangeDeleteModal={(value) => onChangeDeleteModal(value)}
									/>
								) : (
									""
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
