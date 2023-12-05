import { useEffect } from "react";
import { buildUrl } from "../../utils/buildUrl";
import { useState } from "react";

import { IoIosCloseCircle } from "react-icons/io";

export const LogsModal = ({ onCloseLogs }) => {
	let user_id = localStorage.getItem("user_id");

	const [logs, setLogs] = useState([]);

	const handleCloseLogs = () => {
		onCloseLogs(true);
	};

	const getUserLogs = async () => {
		let response = await fetch(buildUrl(`/auth/user-logs/${user_id}`), {
			method: "GET",
		});
		if (!response.ok) {
			console.log("Internal server error");
		} else {
			const data = await response.json();
			console.log(data.logs);
			setLogs(data.logs);
		}
	};

	useEffect(() => {
		getUserLogs();
	}, []);

	return (
		<>
			<div
				className={`fixed z-40 top-0 left-0 w-full h-screen flex items-center backdrop-filter backdrop-blur-sm justify-center `}>
				<div className="w-[800px] h-[500px] shadow bg-white border border-gray-300 rounded p-10">
					<div className="flex items-center justify-between">
						<h1 className="font-bold text-primaryColor">Your logs here</h1>
						<IoIosCloseCircle
							onClick={handleCloseLogs}
							size={22}
							className="text-red-500 cursor-pointer"
						/>
					</div>
					<div className="pt-2">
						<hr />
					</div>
					<p className="text-xs pt-2">
						These logs meticulously document every action, from the inception and
						removal of data to the storage of courses, providing a comprehensive
						record of system activities.
					</p>
					<div className="pt-5">
						<div className="overflow-y-scroll h-[380px]">
							{/* {logs && logs.message && (
							<div className="border border-gray-300 px-4 h-8 flex items-center rounded">
								<h1 className="text-xs">{logs.message}</h1>
							</div>
						)} */}
							{Array.isArray(logs) && logs.length > 0 ? (
								logs.map((log, index) => (
									<div
										key={index}
										className="border border-gray-300 px-4 h-8 flex items-center rounded my-2">
										<div className="w-full text-gray-500 flex justify-between">
											<h1 className="text-xs">{log.message}</h1>
											<h1 className="text-xs">
												{new Date(log.timestamp).toLocaleString("en-US", {
													month: "long", // Display the full month name
													day: "numeric",
													year: "numeric",
													hour: "numeric",
													minute: "numeric",
													hour12: true,
												})}
											</h1>
										</div>
									</div>
								))
							) : (
								<div className="border border-gray-300 px-4 h-8 flex items-center rounded">
									<h1 className="text-xs">No logs available</h1>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
