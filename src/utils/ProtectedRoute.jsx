import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoutes = () => {
	const token = localStorage.getItem("token");
	if (!token) {
		return <Navigate to="/login" />;
	}
	return <Outlet />;
};
