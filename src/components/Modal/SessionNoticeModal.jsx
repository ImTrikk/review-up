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
				setTimeout(() => {
					localStorage.clear();
					nav("/login");
				}, [10000]);
			}
		}, 10000);
	}, []);

	return (
		<div
			className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
				isOpen ? "" : "hidden"
			}`}>
			<div className="border border-gray-100 bg-white w-96 rounded p-5">
				<h1 className="text-lg font-bold text-primaryColor mb-4">
					Session Timeout
				</h1>
				<div className="py-2">
					<hr />
				</div>
				<p>
					Your session has timeout due to inactivity, please login again to
					reauthenticates
				</p>
				<div className="flex justify-end">
					<button
						onClick={onClose}
						className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
						Close
					</button>
				</div>
			</div>
		</div>
	);
};
