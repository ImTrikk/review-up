import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { buildUrl } from "../../utils/buildUrl.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

export const Signup = () => {
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cPassword, setCPassword] = useState("");
	const [phone, setPhone] = useState("");
	const navLogin = useNavigate();
	const [showRedborder, setShowredborder] = useState(false);
	const [showError, setShowerror] = useState(false);
	const loadingBar = useRef(null);

	const endpoint = location.pathname;

	const userData = [first_name, last_name, email, password, phone];

	const navigator = useNavigate();

	const showToast = (message, type) => {
		toast[type](message, {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});

		setTimeout(() => {
			setShowredborder(false);
			setShowerror(false);
		}, 3000);
	};

	const emailRegex = /^[a-zA-Z0-9._-]+@carsu\.edu\.ph$/;

	const handleSignupRequest = async (event) => {
		event.preventDefault();
		if (
			email === "" ||
			first_name === "" ||
			last_name === "" ||
			phone === "" ||
			password === "" ||
			cPassword === ""
		) {
			setShowredborder(true);
			setShowerror(true);
			showToast("Input fields are required", "error");
		} else if (!emailRegex.test(email)) {
			setShowredborder(true);
			setShowerror(true);
			showToast("Must use CARSU account", "error");
		} else if (!/[A-Z]/.test(password)) {
			setShowredborder(true);
			setShowerror(true);
			showToast("Password must contain uppercase character", "error");
		} else if (!/[a-z]/.test(password)) {
			setShowredborder(true);
			setShowerror(true);
			showToast("Password must contain lowercase character", "error");
		} else if (!/[!@#$%^&*]/.test(password)) {
			setShowredborder(true);
			setShowerror(true);
			showToast("Password must have symbols (!@#$%^&*)", "error");
		} else if (password.length <= 12) {
			setShowredborder(true);
			setShowerror(true);
			showToast("Password is too short", "error");
		} else if (cPassword !== password) {
			setShowredborder(true);
			setShowerror(true);
			showToast("Password does not match", "error");
		} else {
			try {
				let response = await fetch(buildUrl("/auth/send-otp"), {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						email,
					}),
				});
				if (response.ok) {
					loadingBar.current.continuousStart(60);
					setTimeout(() => {
						loadingBar.current.complete();
						setTimeout(() => {
							navigator("/verify", { state: { userData, endpoint } });
						}, 1200);
					}, 1000);
				} else {
					showToast("Email already in use", "error");
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<>
			<div className="bg-primaryColor h-screen">
				<LoadingBar height={7} color="#0043DC" ref={loadingBar} />
				<ToastContainer autoClose={2000} />
				<div className="flex items-center justify-center lg:max-w-7xl mx-20 2xl:mx-auto">
					<div className="w-[50%]">
						<div className="p-10">
							<div className="bg-white rounded h-full p-5 shadow-lg">
								<form>
									<div className="space-y-4">
										<div className="grid grid-cols">
											<label htmlFor="" className="text-sm text-primaryColor font-medium">
												First name
											</label>
											<input
												type="text"
												value={first_name}
												onChange={(e) => setFirstName(e.target.value)}
												placeholder="firstname"
												className={` ${
													showRedborder
														? "border border-red-500 text-xs font-light h-10 px-2 rounded"
														: "border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
												}`}
											/>
											<div>{showError}</div>
										</div>
										<div className="grid grid-cols">
											<label htmlFor="" className="text-sm text-primaryColor font-medium">
												Lastname
											</label>
											<input
												type="text"
												value={last_name}
												onChange={(e) => setLastName(e.target.value)}
												placeholder="lastname"
												className={` ${
													showRedborder
														? "border border-red-500 text-xs font-light h-10 px-2 rounded"
														: "border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
												}`}
											/>
											<div>{showError}</div>
										</div>
										<div className="grid grid-cols">
											<label htmlFor="" className="text-sm text-primaryColor font-medium">
												Email
											</label>
											<input
												type="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												placeholder="email"
												className={` ${
													showRedborder
														? "border border-red-500 text-xs font-light h-10 px-2 rounded"
														: "border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
												}`}
											/>
											<div>{showError}</div>
										</div>
										<div className="grid grid-cols">
											<label htmlFor="" className="text-sm text-primaryColor font-medium">
												Phone
											</label>
											<input
												type="number"
												value={phone}
												onChange={(e) => setPhone(e.target.value)}
												placeholder="phone number"
												className={` ${
													showRedborder
														? "border border-red-500 text-xs font-light h-10 px-2 rounded"
														: "border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
												}`}
											/>
											<div>{showError}</div>
										</div>
										<div className="grid grid-cols">
											<label htmlFor="" className="text-sm text-primaryColor font-medium">
												Password
											</label>
											<input
												type="password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												placeholder="Password"
												className={` ${
													showRedborder
														? "border border-red-500 text-xs font-light h-10 px-2 rounded"
														: "border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
												}`}
											/>
											<div>{showError}</div>
										</div>
										<div className="grid grid-cols">
											<label htmlFor="" className="text-sm text-primaryColor font-medium">
												Confirm password
											</label>
											<input
												type="password"
												value={cPassword}
												onChange={(e) => setCPassword(e.target.value)}
												placeholder="type your password again"
												className={` ${
													showRedborder
														? "border border-red-500 text-xs font-light h-10 px-2 rounded"
														: "border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
												}`}
											/>
										</div>
									</div>
									<div className="pt-10">
										<div className="py-1">
											<Link to="/login">
												<p className="text-xs text-gray-400 font-light">
													Already have an account?{" "}
													<span className="italic underline">Login</span>
												</p>
											</Link>
										</div>
										<button
											type="submit"
											onClick={handleSignupRequest}
											className="bg-primaryColor text-white font-bold h-10 w-full rounded">
											Register
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
