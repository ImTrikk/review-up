import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { buildUrl } from "../../utils/buildUrl.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import {
	PiWarningCircleFill,
	PiEyeBold,
	PiEyeClosedBold,
} from "react-icons/pi";
import { IoIosCloseCircle } from "react-icons/io";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [carsuError, setCarsuError] = useState(false);
	const [passError, setPassError] = useState(false);
	const userToken = localStorage.getItem("token");
	const navDashboard = useNavigate();
	const navigator = useNavigate();
	const loadingBar = useRef(null);
	const endpoint = location.pathname;

	const userData = { email: email, password: password };

	const emailRegex = /^[a-zA-Z0-9._-]+@carsu\.edu\.ph$/;

	const handleLoginRequest = async (event) => {
		event.preventDefault();
		loadingBar.current.continuousStart(60);

		if (email === "") {
			loadingBar.current.complete();
			setEmailError(true);
			toast.error("Email required");
		} else {
			loadingBar.current.complete();
			setEmailError(false);
		}

		if (password === "") {
			loadingBar.current.complete();
			setPassError(true);
			toast.error("Password required");
		} else {
			setPassError(false);
		}

		if (email !== "" && !emailRegex.test(email)) {
			loadingBar.current.complete();
			setCarsuError(true);
			toast.error("Must use CARSU account");
		}
		if (email !== "" || password !== "") {
			loadingBar.current.continuousStart(60);
			try {
				let response = await fetch(buildUrl("/auth/send-otp-login"), {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						email,
						password,
					}),
				});
				if (response.ok) {
					setTimeout(() => {
						loadingBar.current.complete();
						setTimeout(() => {
							navigator("/verify", { state: { userData, endpoint } });
						}, 1200);
					}, 1000);
				} else {
					loadingBar.current.complete();
					if (response.status === 400) {
						const data = await response.json();
						if (data.message === "User does not exist") {
							toast.error("User does not exist");
						}
						if (data.message === "Wrong password") {
							setPassError(true);
							toast.error("Wrong password");
						}
					}
				}
			} catch (err) {
				toast.error("Internal Server Error, please retry in another time	");
				console.log(err);
			}
		}
	};

	return (
		<>
			<div className="flex justify-center items-center bg-gradient-to-tr from-primaryColor to-violet-500 h-screen">
				<img
					src="static\images\Blob2.png"
					alt=""
					className="fixed top-0 left-0 w-3/4 sm:w-2/3 md:w-2/4 lg:w-2/5 -rotate-12 opacity-60 blur-sm"
				/>
				<ToastContainer />
				<LoadingBar height={7} color="#E44F48" ref={loadingBar} />
				<div className="flex justify-center">
					<div className="bg-white rounded max-w-[442px] h-full p-4 shadow-2xl mx-10 md:mx-24 lg:mx-20 2xl:mx-auto relative z-10">
						<div className="flex items-start justify-between">
							<h1 className="text-primaryColor font-black text-lg sm:text-xl md:text-2xl lg:text-3xl">
								LOGIN
							</h1>
							<Link to="/">
								<IoIosCloseCircle className="text-red-500 cursor-pointer" size={24} />
							</Link>
						</div>
						<p className="text-[10px] md:text-[12px] lg:text-sm text-gray-400 pt-1 lg:pt-2">
							Login to keep track of ongoing progress and engage in meaningful
							discussions with students.
						</p>
						<div className="pt-4">
							<form>
								<div className="flex flex-col pt-0 md:pt-1 lg:pt-2">
									<label
										htmlFor=""
										className={` ${
											emailError || carsuError
												? "text-[10px] md:text-[12px] lg:text-sm text-red-500 font-medium"
												: "text-[10px] md:text-[12px] lg:text-sm text-primaryColor font-medium"
										}`}>
										Email
									</label>
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="ex. trikku.raiker@carsu.edu.ph"
										className={` ${
											emailError || carsuError
												? "border border-red-500 text-xs font-light h-10 px-2 rounded"
												: "border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
										}`}
									/>
									<h1
										className="flex items-center text-red-500 gap-1 pt-1"
										style={{
											visibility: emailError || carsuError ? "visible" : "hidden",
										}}>
										<PiWarningCircleFill />
										<span className="font-normal text-[11px] text-red-500">
											{emailError ? "Email required" : carsuError ? "Use carsu email" : ""}
										</span>
									</h1>
								</div>
								<div className="relative flex flex-col pt-2">
									<label
										htmlFor=""
										className={
											passError
												? "text-[10px] md:text-[12px] lg:text-sm font-medium text-red-500"
												: "text-[10px] md:text-[12px] lg:text-sm font-medium text-primaryColor"
										}>
										Password
									</label>
									<input
										type={showPassword ? "text" : "password"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Enter the correct password"
										className={
											passError
												? "text-[12px] lg:text-xs font-light border border-red-500 px-4 h-10 py-2 rounded"
												: "text-[12px] lg:text-xs font-light border border-gray-200 px-4 h-10 py-2 rounded outline-primaryColor"
										}
									/>
									<h1
										className="flex items-center text-red-500 gap-1 pt-1"
										style={{
											visibility: passError ? "visible" : "hidden",
										}}>
										<PiWarningCircleFill className="text-[16px]" />
										<span className="flex items-center text-center gap-1 font-normal text-[11px] text-red-500">
											{passError && password === ""
												? "Password required"
												: "Wrong password"}
										</span>
									</h1>
									<div
										className="absolute inset-y-0 right-0 top-7 lg:top-8 pr-3 h-[32px] flex items-center text-gray-500 cursor-pointer"
										onClick={() => setShowPassword(!showPassword)}>
										{showPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
									</div>
								</div>
								<div className="flex items-center justify-between mt-0 lg:mt-2">
									<div className="flex items-center gap-2 ">
										<input
											type="checkbox"
											placeholder="password"
											className="text-sm font-light border border-gray-100 px-4 py-2 rounded outline-none"
										/>
										<label
											htmlFor=""
											className="text-[8px] md:text-[12px] lg:text-sm text-gray-400">
											Remember me
										</label>
									</div>
									<div className="">
										<Link to="/forgot-pass">
											<p className="text-[8px] md:text-[12px] lg:text-sm text-gray-400">
												Forgot password?
											</p>
										</Link>
									</div>
								</div>
								<div className="mt-12 space-y-2">
									<button
										type="submit"
										onClick={handleLoginRequest}
										className="bg-primaryColor text-white px-2 h-8 lg:h-10 rounded w-full text-sm font-bold">
										Login
									</button>
									<div className="">
										<Link to="/signup">
											<button className="border border-primaryColor text-primaryColor px-2 h-8 lg:h-10 rounded w-full text-sm font-bold">
												Register
											</button>
										</Link>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<img
					src="static\images\Blob1.png"
					alt=""
					className="fixed bottom-0 right-0 w-3/4 sm:w-2/3 md:w-2/4 lg:w-2/5 rotate-90 opacity-50 blur-sm"
				/>
			</div>
		</>
	);
};
