import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { buildUrl } from "../../utils/buildUrl.js";
import {
	PiWarningCircleFill,
	PiEyeBold,
	PiEyeClosedBold,
	PiCheckCircleBold,
} from "react-icons/pi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
import { Tooltip } from "react-tooltip";

export const Signup = () => {
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [emailExist, setEmailExist] = useState("");
	const [password, setPassword] = useState("");
	const [type, setType] = useState("password");
	const [cPassword, setCPassword] = useState("");
	const [showCPassword, setShowCPassword] = useState(false);
	const [phone, setPhone] = useState("");
	const navLogin = useNavigate();
	const [showRedborder, setShowredborder] = useState(false);
	const [showError, setShowerror] = useState(false);
	const loadingBar = useRef(null);
	const [fnameError, setFnameError] = useState(false);
	const [lnameError, setLnameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [carsuError, setCarsuError] = useState(false);
	const [phoneError, setPhoneError] = useState(false);
	const [passError, setPassError] = useState(false);
	const [passShortValid, setPassShortValid] = useState(false);
	const [passUpValid, setPassUpValid] = useState(false);
	const [passLowValid, setPassLowValid] = useState(false);
	const [passNumValid, setPassNumValid] = useState(false);
	const [passSymValid, setPassSymValid] = useState(false);
	const [passShortError, setPassShortError] = useState(false);
	const [passUpError, setPassUpError] = useState(false);
	const [passLowError, setPassLowError] = useState(false);
	const [passNumError, setPassNumError] = useState(false);
	const [passSymError, setPassSymError] = useState(false);
	const [cPassError, setCPassError] = useState(false);

	const endpoint = location.pathname;

	const userData = {
		first_name: first_name,
		last_name: last_name,
		email: email,
		password: password,
		phone: phone,
	};

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
			loadingBar.current.complete();
			setShowerror(false);
		}, 3000);
	};

	//Email validation
	const emailRegex = /^[a-zA-Z0-9._-]+@carsu\.edu\.ph$/;

	//Password Validation
	const handleChange = (value) => {
		const lower = new RegExp("(?=.*[a-z])");
		const upper = new RegExp("(?=.*[A-Z])");
		const number = new RegExp("(?=.*[0-9])");
		const special = new RegExp("(?=.*[!@#$%^&*])");
		const length = new RegExp("(?=.{12,})");

		//Lowercase Validation
		if (lower.test(value)) {
			setPassLowValid(true);
			loadingBar.current.complete();
			setPassLowError(false);
		} else {
			setPassLowValid(false);
			loadingBar.current.complete();
			setPassLowError(true);
		}
		//Uppercase Validation
		if (upper.test(value)) {
			setPassUpValid(true);
			loadingBar.current.complete();
			setPassUpError(false);
		} else {
			setPassUpValid(false);
			loadingBar.current.complete();
			setPassUpError(true);
		}

		//Number Validation
		if (number.test(value)) {
			setPassNumValid(true);
			loadingBar.current.complete();
			setPassNumError(false);
		} else {
			loadingBar.current.complete();
			setPassNumValid(false);
			setPassNumError(true);
		}

		//Character Validation
		if (special.test(value)) {
			setPassSymValid(true);
			loadingBar.current.complete();
			setPassSymError(false);
		} else {
			setPassSymValid(false);
			loadingBar.current.complete();
			setPassSymError(true);
		}

		//Length Validation
		if (length.test(value)) {
			setPassShortValid(true);
			loadingBar.current.complete();
			setPassShortError(false);
		} else {
			setPassShortValid(false);
			loadingBar.current.complete();
			setPassShortError(true);
		}
	};

	const handleSignupRequest = async (event) => {
		event.preventDefault();
		loadingBar.current.continuousStart(60);
		setFnameError(false);
		setLnameError(false);
		setEmailError(false);
		setEmailExist(false);
		setCarsuError(false);
		setPhoneError(false);
		setPassError(false);
		setCPassError(false);

		// Check for empty fields and set error states
		const fields = [
			{
				value: first_name,
				setError: setFnameError,
				message: "First name is required",
			},
			{
				value: last_name,
				setError: setLnameError,
				message: "Last name is required",
			},
			{ value: email, setError: setEmailError, message: "Email is required" },
			{ value: phone, setError: setPhoneError, message: "Phone is required" },
			{ value: password, setError: setPassError, message: "Password is required" },
			{
				value: cPassword,
				setError: setCPassError,
				message: "Confirm password is required",
			},
		];

		fields.forEach((field) => {
			if (field.value === "") {
				field.setError(true);
				setShowerror(true);
				showToast(field.message, "error");
			}
		});
		if (email !== "" && !emailRegex.test(email)) {
			setCarsuError(true);
			loadingBar.current.complete();
			setShowerror(true);
			showToast("Must use CARSU email", "error");
		} else if (cPassword !== password) {
			loadingBar.current.complete();
			setCPassError(true);
			setShowerror(true);
			showToast("Password does not match", "error");
		}
		if (
			first_name !== "" &&
			last_name !== "" &&
			email !== "" &&
			phone !== "" &&
			password !== "" &&
			cPassword !== ""
		) {
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
					console.log(response);
					setTimeout(() => {
						loadingBar.current.complete();
						setTimeout(() => {
							navigator("/verify", { state: { userData, endpoint } });
						}, 1200);
					}, 1000);
				} else {
					loadingBar.current.complete();
					showToast("Email already in use", "error");
				}
			} catch (err) {
				loadingBar.current.complete();
				console.log(err);
			}
		}
	};

	return (
		<>
			<div className="bg-gradient-to-tr from-primaryColor to-violet-500 h-screen">
				<LoadingBar height={7} color="#E44F48" ref={loadingBar} />
				<ToastContainer autoClose={2000} />
				<img
					src="static\images\Blob2.png"
					alt=""
					className="w-full md:w-[502px] h-auto mt-10 absolute z-0 -rotate-12 opacity-70"
				/>
				<div className="flex items-center justify-center mx-5  lg:max-w-7xl 2xl:mx-auto relative z-10">
					<div className="w-full md:w-[50%]">
						<div className="px-10 p-7">
							<div className="bg-white rounded h-full p-4 shadow-2xl">
								<h1 className="text-3xl font-black text-primaryColor pb-4">
									CREATE ACCOUNT <hr />
								</h1>
								<form>
									<div className="space-y-1">
										<div className="flex flex-row gap-2">
											<div className="grid grid-cols w-full">
												<label
													htmlFor=""
													className={` ${
														fnameError
															? "text-sm text-red-500 font-medium"
															: "text-sm text-primaryColor font-medium"
													}`}>
													First name
												</label>
												<input
													type="text"
													value={first_name}
													onChange={(e) => setFirstName(e.target.value)}
													placeholder="Firstname"
													className={` ${
														fnameError
															? "border border-red-500 text-xs font-light h-10 px-2 rounded"
															: "border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
													}`}
												/>
												<h1
													className="flex items-center text-red-500 gap-1 pt-1"
													style={{ visibility: fnameError ? "visible" : "hidden" }}>
													<PiWarningCircleFill />
													<span className="font-normal text-[11px]">
														First name required
													</span>
												</h1>
												<div>{showError}</div>
											</div>
											<div className="grid grid-cols w-full">
												<label
													htmlFor=""
													className={` ${
														lnameError
															? "text-sm text-red-500 font-medium"
															: "text-sm text-primaryColor font-medium"
													}`}>
													Last name
												</label>
												<input
													type="text"
													value={last_name}
													onChange={(e) => setLastName(e.target.value)}
													placeholder="Lastname"
													className={` ${
														lnameError
															? "border border-red-500 text-xs font-light h-10 px-2 rounded"
															: "border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
													}`}
												/>
												<h1
													className="flex items-center text-red-500 gap-1 pt-1"
													style={{ visibility: lnameError ? "visible" : "hidden" }}>
													<PiWarningCircleFill />
													<span className="font-normal text-[11px]">Last name required</span>
												</h1>
												<div>{showError}</div>
											</div>
										</div>
										<div className="grid grid-cols">
											<label
												htmlFor=""
												className={` ${
													emailError || carsuError || emailExist
														? "text-sm text-red-500 font-medium"
														: "text-sm text-primaryColor font-medium"
												}`}>
												Email
											</label>
											<input
												type="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												placeholder="Email"
												className={` ${
													emailError || carsuError || emailExist
														? "border border-red-500 text-xs font-light h-10 px-2 rounded"
														: "border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
												}`}
											/>
											<h1
												className="flex items-center text-red-500 gap-1 pt-1"
												style={{
													visibility:
														emailError || carsuError || emailExist ? "visible" : "hidden",
												}}>
												<PiWarningCircleFill />
												<span className="font-normal text-[11px] text-red-500">
													{emailError
														? "Email required"
														: carsuError
														? "Use carsu email"
														: emailExist
														? "Email already exists"
														: ""}
												</span>
											</h1>
											<div>{showError}</div>
										</div>
										<div className="grid grid-cols">
											<label
												htmlFor=""
												className={` ${
													phoneError
														? "text-sm text-red-500 font-medium"
														: "text-sm text-primaryColor font-medium"
												}`}>
												Phone
											</label>
											<input
												type="number"
												value={phone}
												onChange={(e) => setPhone(e.target.value)}
												placeholder="Phone number"
												className={` ${
													phoneError
														? "border border-red-500 text-xs font-light h-10 px-2 rounded"
														: "border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
												}`}
											/>
											<h1
												className="flex items-center text-red-500 gap-1 pt-1"
												style={{ visibility: phoneError ? "visible" : "hidden" }}>
												<PiWarningCircleFill />
												<span className="font-normal text-[11px]">Phone required</span>
											</h1>
											<div>{showError}</div>
										</div>
										<div className="grid grid-cols z-10">
											<label
												htmlFor=""
												className={` ${
													passError ||
													passShortError ||
													passLowError ||
													passUpError ||
													passNumError ||
													passSymError
														? "text-sm text-red-500 font-medium"
														: "text-sm text-primaryColor font-medium"
												}`}>
												Password
											</label>
											<div className="relative">
												<input
													placeholder="Password"
													className={` ${
														passError ||
														passShortError ||
														passLowError ||
														passUpError ||
														passNumError ||
														passSymError
															? "border border-red-500 w-full h-10 px-2 text-xs font-light rounded-md"
															: "border border-gray-200 w-full h-10 px-2 text-xs font-light rounded-md outline-primaryColor"
													}`}
													type={type}
													onChange={(e) => {
														handleChange(e.target.value);
														setPassword(e.target.value);
													}}
													data-tooltip-id="passwordTooltip"
												/>
												{type === "password" ? (
													<span
														className="icon-span absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
														onClick={() => setType("text")}>
														<PiEyeClosedBold />
													</span>
												) : (
													<span
														className="icon-span absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
														onClick={() => setType("password")}>
														<PiEyeBold />
													</span>
												)}
												<Tooltip
													id="passwordTooltip"
													place="right"
													className="z-20"
													border="1px solid #5A5DFA"
													style={{ background: "#fff" }}>
													<div className="text-xs">
														<div
															className={`flex items-center gap-1 ${
																passShortValid ? "text-green-500" : "text-red-500"
															}`}>
															{passShortValid ? (
																<PiCheckCircleBold />
															) : (
																<AiOutlineCloseCircle />
															)}{" "}
															At least 12 characters
														</div>
														<div
															className={`flex items-center gap-1 ${
																passLowValid ? "text-green-500" : "text-red-500"
															}`}>
															{passLowValid ? <PiCheckCircleBold /> : <AiOutlineCloseCircle />}{" "}
															At least one lowercase
														</div>
														<div
															className={`flex items-center gap-1 ${
																passUpValid ? "text-green-500" : "text-red-500"
															}`}>
															{passUpValid ? <PiCheckCircleBold /> : <AiOutlineCloseCircle />}{" "}
															At least one uppercase
														</div>
														<div
															className={`flex items-center gap-1 ${
																passNumValid ? "text-green-500" : "text-red-500"
															}`}>
															{passNumValid ? <PiCheckCircleBold /> : <AiOutlineCloseCircle />}{" "}
															At least one number
														</div>
														<div
															className={`flex items-center gap-1 ${
																passSymValid ? "text-green-500" : "text-red-500"
															}`}>
															{passSymValid ? <PiCheckCircleBold /> : <AiOutlineCloseCircle />}{" "}
															At least one "!@#$%^&*" special character
														</div>
													</div>
												</Tooltip>
											</div>
											<h1
												className="flex items-center text-red-500 gap-1 pt-1"
												style={{
													visibility:
														(passError && password === "") ||
														passShortError ||
														passLowError ||
														passUpError ||
														passNumError ||
														passSymError
															? "visible"
															: "hidden",
												}}>
												<PiWarningCircleFill className="text-[16px]" />
												<span className="flex items-center text-center gap-1 font-normal text-[11px] text-red-500">
													{passError && password === ""
														? "Password required"
														: "Check password"}
												</span>
											</h1>
											<div>{showError}</div>
										</div>
										<div className="grid grid-cols">
											<label
												htmlFor=""
												className={` ${
													cPassError
														? "text-sm text-red-500 font-medium"
														: "text-sm text-primaryColor font-medium"
												}`}>
												Confirm password
											</label>
											<div className="relative">
												<input
													type={showCPassword ? "text" : "password"}
													value={cPassword}
													onChange={(e) => setCPassword(e.target.value)}
													placeholder="Type your password again"
													className={` ${
														passError
															? "border border-red-500 w-full h-10 px-2 text-xs font-light rounded-md"
															: "border border-gray-200 w-full h-10 px-2 text-xs font-light rounded-md outline-primaryColor"
													}`}
												/>
												<div
													className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
													onClick={() => setShowCPassword(!showCPassword)}>
													{showCPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
												</div>
											</div>
											<h1
												className="flex items-center text-red-500 gap-1 pt-1"
												style={{ visibility: cPassError ? "visible" : "hidden" }}>
												<PiWarningCircleFill />
												<span className="font-normal text-[11px]">Confirm password</span>
											</h1>
										</div>
									</div>
									<div className="pt-2">
										<div className="py-1">
											<Link to="/login">
												<p className="text-xs text-gray-400 font-light">
													Already have an account?{" "}
													<span className="italic underline text-primaryColor font-medium">
														Login
													</span>
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
				<img
					src="static\images\Blob1.png"
					alt=""
					className="w-full md:w-[502px] h-auto absolute z-0 rotate-90 opacity-60 bottom-0 right-0"
				/>
			</div>
		</>
	);
};
