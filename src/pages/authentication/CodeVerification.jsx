import { useState, useRef } from "react";
import { buildUrl } from "../../utils/buildUrl";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

export const CodeVerification = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const userData = location.state ? location.state.userData : null;

	const reqEndpoint = location.state ? location.state.endpoint : null;

	console.log(reqEndpoint);

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
		}
	};

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
				console.log(res.status)
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
							localStorage.setItem(
								"first_name",
								data.foundUser.first_name,
							);
							localStorage.setItem(
								"last_name",
								data.foundUser.last_name,
							);
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
								toast.success("Success login, redirecting to dashboard");
								loadingBar.current.continuousStart(60);
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
			})
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="bg-primaryColor h-screen">
				<ToastContainer />
				<LoadingBar height={7} color="#0043DC" ref={loadingBar} />
				<div className="flex lg:max-w-7xl mx-20 2xl:mx-auto">
					<div className="flex items-center justify-center w-full h-screen">
						<div className="flex gap-10 justify-between">
							<div className="w-[400px]">
								<h1 className="font-black text-4xl text-white">Almost there</h1>
								<p className="text-white font-light pt-5">
									One time password is sent to your email account, Please look through
									your Gmail account and enter the provided code
								</p>
							</div>
							<div className="w-[500px] bg-white h-[270px] rounded p-5">
								<div>
									<p className="text-sm font-semibold text-primaryColor">
										Email verification code
									</p>
									<p className="text-xs pt-2">
										Input the code received from your email account
									</p>
								</div>
								<div className="flex items-center justify-center pt-10">
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
								</div>
								<div className="flex justify-between items-center pt-16">
									<button
										onClick={handleResendOtp}
										className="text-xs text-primaryColor">
										Didn't receive the email?
									</button>
									<button
										onClick={handleVerifyCode}
										className="bg-primaryColor text-white px-2 h-8 rounded text-xs">
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
