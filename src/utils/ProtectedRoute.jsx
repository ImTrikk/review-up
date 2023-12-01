import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { buildUrl } from "./buildUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProtectedRoutes = () => {
	const [isValidToken, setIsValidToken] = useState(null);

	useEffect(() => {
		const validateToken = async () => {
			const token = localStorage.getItem("token");

			try {
				const response = await fetch(buildUrl("/auth/validate-token"), {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						token,
					}),
				});

				const data = await response.json();

				if (response.ok) {
					setIsValidToken(true);
				} else {
					toast.error("Token already expired, login required", data);
					localStorage.clear();
					setTimeout(() => {
						setIsValidToken(false);
					}, 3000);
				}
			} catch (err) {
				toast.error(err);
			}
		};

		validateToken();
	}, []); // Run the effect only once when the component mounts

	if (isValidToken === null) {
		// Loading state
		return (
			<div className="flex items-center justify-center w-full h-screen">
				<ToastContainer />
				<div>
					<img src="/static/images/loading.jpg" alt="" className="w-[600px]" />
				</div>
			</div>
		);
	}

	if (!isValidToken) {
		return (
			<div>
				<Navigate to="/login" />
			</div>
		);
	}

	return <Outlet />;
};
