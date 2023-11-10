import { Outlet, Navigate } from "react-router-dom";

// const useAuth = () => {
// 	return !!localStorage.getItem("token");
// };

export const ProtectedRoutes = () => {
	// const isAuth = useAuth();

	const token = localStorage.getItem("token")
	
	if (!token) {
		// If not authenticated, navigate to the login page
		return <Navigate to="/login" />;
	}

	// If authenticated, render the child routes
	return <Outlet />;
};
