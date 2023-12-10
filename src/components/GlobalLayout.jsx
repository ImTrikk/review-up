import React, { useState, useEffect, useRef } from "react";
import { SessionNoticeModal } from "./Modal/SessionNoticeModal";

// set sesssion timeout inactivity of 30 minutes
const YOUR_SESSION_TIMEOUT_DURATION = 1800000; // 30 minutes in milliseconds

const GlobalLayout = ({ children }) => {
	const [sessionTimeoutModalOpen, setSessionTimeoutModalOpen] = useState(false);

	// Track the last user activity timestamp
	const lastActivityTimestamp = useRef(Date.now());

	// Function to handle user activity
	const handleUserActivity = () => {
		lastActivityTimestamp.current = Date.now();
	};

	// Logic to open/close the modal based on session timeout and inactivity
	useEffect(() => {
		const checkSessionTimeout = () => {
			const currentTime = Date.now();
			const lastActivityTime = lastActivityTimestamp.current;
			const timeSinceLastActivity = currentTime - lastActivityTime;

			if (timeSinceLastActivity > YOUR_SESSION_TIMEOUT_DURATION) {
				setSessionTimeoutModalOpen(true);
			}
		};

		// Check session timeout periodically
		const sessionTimeoutInterval = setInterval(checkSessionTimeout, 10000); // Check every 10 seconds

		// Clear the interval on component unmount
		return () => clearInterval(sessionTimeoutInterval);
	}, []);

	// Set up event listeners to handle user activity
	useEffect(() => {
		// Listen for mouse move and keydown events
		document.addEventListener("mousemove", handleUserActivity);
		document.addEventListener("keydown", handleUserActivity);

		// Clean up event listeners on component unmount
		return () => {
			document.removeEventListener("mousemove", handleUserActivity);
			document.removeEventListener("keydown", handleUserActivity);
		};
	}, []);

	return (
		<div>
			{children}
			{sessionTimeoutModalOpen ? (
				<SessionNoticeModal
					isOpen={sessionTimeoutModalOpen}
					onClose={() => setSessionTimeoutModalOpen(false)}
				/>
			) : (
				""
			)}
		</div>
	);
};

export default GlobalLayout;
