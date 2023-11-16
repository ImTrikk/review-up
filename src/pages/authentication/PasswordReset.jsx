import { useState, useRef, useEffect } from "react";
import { buildUrl } from "../../utils/buildUrl";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
	const inputRefs = verificationCode.map(() => useRef());

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
					setOpenCodeForm(true);
				}
				if (res.status === 400) {
				}
				toast.error("Email does not exist");
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

	const handleSubmitOtp = async () => {
		try {
			await fetch(buildUrl("/auth/check-otp"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					concatenatedCode,
				}),
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
									</div>
									<div className="flex justify-between items-center pt-5">
										<button className="text-xs text-primaryColor">Resend </button>
										<button
											onClick={handleSendOtp}
											className="bg-primaryColor text-white px-5 h-8 rounded text-xs">
											Send
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
