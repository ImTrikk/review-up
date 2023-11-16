import { useState, useRef, useEffect } from "react";
import { buildUrl } from "../../utils/buildUrl";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

export const CodeVerification = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const userData = location.state ? location.state.userData : null;
	const reqEndpoint = location.state ? location.state.endpoint : null;
	const [countdown, setCountdown] = useState(30);
	const [attemp, setAttempt] = useState(3);
	const [retryCountdown, setRetryCountDown] = useState(180);

	const [verificationCode, setVerificationCode] = useState([
		"",
		"",
		"",
		"",
		"",
		"",
	]);

	const loadingBar = useRef(null);
	const inputRefs = verificationCode.map(() => useRef());

	const navigator = useNavigate();

	const handleInputChange = (index, value) => {
		setVerificationCode((prevCodes) => {
			const newVerificationCode = [...prevCodes];
			newVerificationCode[index] = value;
			return newVerificationCode;
		});

		// If a single number is entered, move to the next input field
		if (value.length === 1 && index < inputRefs.length - 1) {
			inputRefs[index + 1].current.focus();
		} else if (value.length === 0 && index > 0) {
			// If Backspace is pressed with an empty input, move to the previous input field
			inputRefs[index - 1].current.focus();
		}

		// // If a single number is entered, move to the next input field
		// if (value.length === 1 && index < inputRefs.length - 1) {
		// 	inputRefs[index + 1].current.focus();
		// }
	};

	let concatenatedCode = verificationCode.join("");

	// send data to server side
	const handleVerifyCode = async () => {
		try {
			// this should go to the TwoFactorAtuh endpoint
			await fetch(buildUrl(`/auth${reqEndpoint}`), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userData,
					concatenatedCode,
				}),
			}).then((res) => {
				if (res.status === 200 || res.status === 201) {
					if (reqEndpoint === "/signup") {
						toast.success("Account created, redirecting to login page...");
						loadingBar.current.continuousStart(60);
						setTimeout(() => {
							loadingBar.current.complete();
							setTimeout(() => {
								navigator("/login");
							}, 1200);
						}, 1000);
					} else {
						return res.json().then((data) => {
							localStorage.setItem("user_id", data.foundUser.user_id);
							localStorage.setItem("token", data.jwtToken);
							localStorage.setItem("first_name", data.foundUser.first_name);
							localStorage.setItem("last_name", data.foundUser.last_name);
							localStorage.setItem("email", data.foundUser.email);
							localStorage.setItem("phone", data.foundUser.phone);
							toast.success("Verified email, login successful!", {
								position: "top-right",
								autoClose: 2000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
								theme: "light",
							});
							loadingBar.current.continuousStart(50);
							setTimeout(() => {
								loadingBar.current.complete();
								setTimeout(() => {
									navigator("/dashboard");
								}, 1200);
							}, 1000);
						});
					}
				} else {
					setAttempt(attemp - 1);
					toast.error("Entered wrong OTP code!");
				}
			});
		} catch (err) {
			console.log(err);
			toast.error(err);
		}
	};

	const handleResendOtp = async () => {
		setCountdown(30);
		let reqEndpointOtp;
		const { email, password } = userData;
		let requestBody = {};
		concatenatedCode = "";
		try {
			if (reqEndpoint === "/signup") {
				reqEndpointOtp = "send-otp";
			} else {
				reqEndpointOtp = "send-otp-login";
			}

			// Set the request body based on reqEndpoint
			if (reqEndpoint === "/signup") {
				requestBody = userData;
			}

			await fetch(buildUrl(`/auth/${reqEndpointOtp}`), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password, requestBody }),
			}).then((res) => {
				return res.json().then((data) => {
					if (res.ok) {
						toast.info("Code has been sent to your email account!");
					}
				});
			});
		} catch (err) {
			console.log(err);
		}
	};

		useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prevCountdown) => {
				if (prevCountdown === 0) {
					clearInterval(timer);
					return 0;
				}
				return prevCountdown - 1;
			});
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	});

	useEffect(() => {
		let timer;

		if (attemp === 0) {
			timer = setInterval(() => {
				setRetryCountDown((prevCountdown) => {
					if (prevCountdown === 0) {
						clearInterval(timer);
						setRetryCountDown(180);
						setAttempt(3);
						return 0;
					}
					return prevCountdown - 1;
				});
			}, 1000);
		}

		return () => {
			clearInterval(timer);
		};
	}, [attemp, retryCountdown]);

	return (
		<>
			<div className="bg-primaryColor h-screen">
				<ToastContainer />
				<LoadingBar height={7} color="#E44F48" ref={loadingBar} />
				<div className="flex lg:max-w-7xl mx-20 2xl:mx-auto">
					<div className="flex items-center justify-center w-full h-screen">
						<div className="flex gap-10 justify-between">
							<div className="w-[400px]">
								<h1 className="font-black text-4xl text-white">Almost there</h1>
								<p className="text-white text-sm font-light pt-5">
									One time password is sent to your email account, Please look through
									your Gmail account and enter the provided code
								</p>
								<Link to="/login">
									<p className="text-white text-sm underline font-light pt-5">
										Choose a different account
									</p>
								</Link>
							</div>
							<div className="w-auto bg-white h-auto rounded p-10">
								<div>
									<p className="text-sm font-semibold text-primaryColor">
										Email verification code
									</p>
									<p className="text-xs pt-2">
										Input the code received from your email account
									</p>
								</div>
								<div className="flex items-center justify-center pt-10">
									<div>
										<div className="flex gap-2">
											{verificationCode.map((value, index) => (
												<input
													key={index}
													type="text"
													className="h-14 w-14 rounded bg-white text-lg text-center outline-primaryColor border border-primaryColor"
													value={value}
													onChange={(e) => handleInputChange(index, e.target.value)}
													ref={inputRefs[index]}
													inputMode="numeric"
												/>
											))}
										</div>
										<div className="mt-5">
											{attemp === 0 ? (
												<p className="text-xs">Retry in: {retryCountdown}</p>
											) : (
												<p className="text-xs text-red-400">Attemps left: {attemp}</p>
											)}
										</div>
									</div>
								</div>
								{attemp === 0 ? (
									""
								) : (
									<div className="flex justify-between items-center mt-5">
										{countdown === 0 ? (
											<button
												onClick={handleResendOtp}
												className="text-xs text-primaryColor"
												disabled={countdown > 0 || attemp === 0}>
												Resend code
											</button>
										) : (
											<button
												className="text-xs text-primaryColor"
												disabled={countdown > 0 || attemp === 0}>
												Resend in {countdown}
											</button>
										)}

										<button
											onClick={handleVerifyCode}
											disabled={attemp === 0}
											className="bg-primaryColor text-white px-2 h-8 rounded text-xs">
											Send
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};