import { useState, useRef, useEffect } from "react";
import { buildUrl } from "../../utils/buildUrl";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

export const PasswordReset = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const userData = location.state ? location.state.userData : null;
	const reqEndpoint = location.state ? location.state.endpoint : null;
	const [countdown, setCountdown] = useState(30);

	const loadingBar = useRef(null);

	const navigator = useNavigate();

	// send data to server side
	const handleVerifyCode = async () => {
		const concatenatedCode = verificationCode.join("");
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
				if (res.status === 200) {
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
					toast.error("Entered wrong OTP code!");
				}
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
	}, []);

	const handleResendOtp = async () => {
		try {
			await fetch(buildUrl("/auth/resend-verify"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: {
					email,
				},
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
								<img src="public\static\images\Forgot password-amico.png" alt="" />
							</div>
							<div className="w-[500px] bg-white h-[230px] rounded p-5">
								<div>
									<p className="text-3xl font-semibold text-primaryColor">
										Forgot Your Password?
									</p>
									<p className="text-xs pt-2">
										To proceed with changing your password, please enter your registered
										email for the email verification.
									</p>
								</div>
								<div className="flex py-5">
									<input
										type="email"
										placeholder="ex. trikku.raiker@carsu.edu.ph"
										className="text-xs font-light border border-gray-200 px-4 w-[458px] h-10 py-2 rounded outline-none"
									/>
								</div>
								<div className="flex justify-between items-center">
									<button
										onClick={handleResendOtp}
										className="text-xs text-primaryColor"
										disabled={countdown > 0}>
										Resend in {countdown}s
									</button>
									<button
										onClick={handleVerifyCode}
										className="bg-primaryColor text-white px-5 h-8 rounded text-xs">
										Send
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
