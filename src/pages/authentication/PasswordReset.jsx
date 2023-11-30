import { useState, useRef, useEffect } from "react";
import { buildUrl } from "../../utils/buildUrl";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast, useToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

export const PasswordReset = () => {
	const loadingBar = useRef(null);
	const [sentCode, setSentCode] = useState(false);
	const [email, setEmail] = useState("");
	const [openCodeForm, setOpenCodeForm] = useState(false);
	const [verificationCode, setVerificationCode] = useState([
		"",
		"",
		"",
		"",
		"",
		"",
	]);
	const [sentEmail, setSentEmail] = useState(false);
	const inputRefs = verificationCode.map(() => useRef());
	const [newPassword, setNewPassword] = useState("");
	const [cPassword, setCpassword] = useState("");
	const [confirmedOTP, setConfirmedOTP] = useState(false);

	const handleSendOtp = async (event) => {
		event.preventDefault();
		await fetch(buildUrl("/auth/forgot-password"), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
			}),
		}).then((res) => {
			return res.json().then((data) => {
				if (res.ok) {
					toast.info("OTP is sent to your email account");
					setSentEmail(true);
					setOpenCodeForm(true);
				}
				if (res.status === 400) {
					toast.error("Email does not exist");
				}
			});
		});
	};

	const handleInputChange = (index, value) => {
		setVerificationCode((prevCodes) => {
			const newVerificationCode = [...prevCodes];
			newVerificationCode[index] = value;
			return newVerificationCode;
		});

		// If a single number is entered, move to the next input field
		if (value.length === 1 && index < inputRefs.length - 1) {
			inputRefs[index + 1].current.focus();
		}
	};

	let concatenatedCode = verificationCode.join("");

	const handleSubmitOtp = async (event) => {
		event.preventDefault();
		try {
			await fetch(buildUrl("/auth/check-otp"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					concatenatedCode,
				}),
			}).then((res) => {
				return res.json().then((data) => {
					if (res.ok) {
						toast.success("OTP verified");
						setOpenCodeForm(false);
						setConfirmedOTP(true);
					}
				});
			});
		} catch (err) {
			console.log(err);
		}
	};

	const navigate = useNavigate();

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
	};

	const handleResetPassword = async (event) => {
		event.preventDefault();
		// implement secure passsword
		if (newPassword === "" || cPassword === "") {
			showToast("Input fields are required", "error");
		} else if (newPassword.length <= 12) {
			showToast("newPassword is too short", "error");
		} else if (!/[A-Z]/.test(newPassword)) {
			showToast("newPassword must contain uppercase character", "error");
		} else if (!/[a-z]/.test(newPassword)) {
			showToast("newPassword must contain lowercase character", "error");
		} else if (!/[!@#$%^&*]/.test(newPassword)) {
		} else if (cPassword !== newPassword) {
			showToast("Password must have symbols (!@#$%^&*)", "error");
			showToast("Password does not match", "error");
		}
		try {
			await fetch(buildUrl("/auth/reset-password"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					newPassword,
				}),
			}).then(async (res) => {
				return res.json().then((data) => {
					if (res.ok) {
						toast.success(data.message);
						setTimeout(() => {
							navigate("/login");
						}, 5000);
					} else {
						toast.error(data.message);
					}
				});
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="bg-primaryColor h-screen">
				<ToastContainer />
				<LoadingBar height={7} color="#E44F48" ref={loadingBar} />
				<div className="flex lg:max-w-7xl mx-20 2xl:mx-auto">
					<div className="flex items-center justify-center w-full h-screen">
						<div className="flex items-center gap-10 justify-between">
							<div className="w-[400px]">
								<img src="/static/images/Forgot password-amico.png" alt="" />
							</div>
							<div className="w-[500px] bg-white rounded p-5">
								<div>
									<p className="text-3xl font-bold text-primaryColor">
										Forgot Your Password?
									</p>
									<p className="text-xs pt-2">
										To proceed with changing your password, please enter your registered
										email for the email verification.
									</p>
								</div>
								<form>
									<div className="py-5">
										<input
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="ex. trikku.raiker@carsu.edu.ph"
											className="text-xs font-light border border-gray-200 px-4 w-[458px] h-10 py-2 rounded outline-none"
										/>
										<Link to="/login">
											<p className="text-xs text-primaryColor py-2">
												Choose a different carsu account
											</p>
										</Link>
									</div>
									<div>
										{sentCode ? (
											<div>
												<p className="text-xs text-green-500">
													Code has been sent to your email account
												</p>
											</div>
										) : (
											""
										)}
									</div>
									<div>
										{openCodeForm ? (
											<div>
												<p className="text-xs text-gray-600">Enter one time password</p>
												<div className="flex gap-2 pt-2">
													{verificationCode.map((value, index) => (
														<input
															key={index}
															type="text"
															className="h-10 w-10 rounded bg-white text-lg text-center outline-primaryColor border border-primaryColor"
															value={value}
															onChange={(e) => handleInputChange(index, e.target.value)}
															ref={inputRefs[index]}
															inputMode="numeric"
														/>
													))}
												</div>
											</div>
										) : (
											""
										)}
										{confirmedOTP ? (
											<div className="pt-2">
												<div className="flex flex-col gap-2">
													<input
														type="password"
														placeholder="Enter new password"
														value={newPassword}
														onChange={(e) => setNewPassword(e.target.value)}
														className="h-10 outline-none px-4 rounded border border-primaryColor text-xs text-gray-500"
													/>
													<input
														type="password"
														placeholder="Confirm new passwoird"
														value={cPassword}
														onChange={(e) => setCpassword(e.target.value)}
														className="h-10 outline-none px-4 rounded border border-primaryColor text-xs text-gray-500"
													/>
												</div>
											</div>
										) : (
											""
										)}
									</div>
									<div className="flex justify-between items-center pt-5">
										<button className="text-xs text-primaryColor">Resend </button>
										{confirmedOTP ? (
											<button
												onClick={handleResetPassword}
												className="bg-primaryColor text-white px-5 h-8 rounded text-xs">
												Reset password
											</button>
										) : (
											<div>
												{sentEmail ? (
													<button
														onClick={handleSubmitOtp}
														className="bg-primaryColor text-white px-5 h-8 rounded text-xs">
														Send OTP
													</button>
												) : (
													<button
														onClick={handleSendOtp}
														className="bg-primaryColor text-white px-5 h-8 rounded text-xs">
														Send email
													</button>
												)}
											</div>
										)}
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
