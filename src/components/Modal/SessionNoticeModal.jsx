import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buildUrl } from "../../utils/buildUrl";

export const SessionNoticeModal = ({ isOpen, onClose }) => {
	const nav = useNavigate();

	useEffect(() => {
		setTimeout(async () => {
			onClose();
			let res = await fetch(buildUrl("/auth/logout"), {
				method: "DELETE",
			});
			if (res.ok) {
				localStorage.clear();
			}
		}, 10000);
	}, []);

	const handleClose = () => {
		localStorage.clear();
		nav("/login");
	};

	return (
		<div
			className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${
				isOpen ? "" : "hidden"
			}`}>
			<div
				className="fixed top-0 left-0 w-full h-full backdrop-filter backdrop-blur-sm"
				style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}></div>
			<div className="border border-gray-300 bg-white w-96 rounded p-5 relative">
				<h1 className="text-lg font-bold text-primaryColor mb-4">
					Session Timeout
				</h1>
				<div className="py-2">
					<hr />
				</div>
				<p>
					Your session has timed out due to inactivity. Please login again to
					reauthenticate.
				</p>
				<div className="flex justify-end">
					<button
						onClick={handleClose}
						className="mt-4 bg-blue-500 text-white text-xs px-4 py-2 rounded">
						Okay
					</button>
				</div>
			</div>
		</div>
	);
};
