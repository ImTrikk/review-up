import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { buildUrl } from "./buildUrl";

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

				if (response.ok) {
					setIsValidToken(true);
				} else {
					setIsValidToken(false);
				}
			} catch (err) {
				console.error(err);
				setIsValidToken(false);
			}
		};

		validateToken();
	}, []); // Run the effect only once when the component mounts

	if (isValidToken === null) {
		// Loading state
		return <p>Loading...</p>;
	}

	if (!isValidToken) {
		return <Navigate to="/login" />;
	}

	return <Outlet />;
};
