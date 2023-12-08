import express from "express";
import {
	CheckOTP,
	DeleteLogs,
	DeleteUserAccount,
	ForgotPassword,
	Logout,
	ResetPassword,
	UserLogs,
	ValidateToken,
	login,
	signup,
} from "../Controllers/auth.js";
import {
	TwoFactorAuth,
	checkEmailValidity,
} from "../MIddleware/CheckValidEmail.js";
import { checkEligibleEmail, sendOtp } from "../MIddleware/CheckValidEmail.js";

const router = express.Router();

// auth routers and initial endpoint with middlewres

// for signup otp
router.post("/send-otp", checkEligibleEmail, sendOtp);

//for login otp
router.post("/send-otp-login", checkEmailValidity, sendOtp);
router.post("/signup", TwoFactorAuth, signup);
router.post("/login", TwoFactorAuth, login);
router.delete("/logout/:id", Logout);

router.post("/validate-token", ValidateToken);

// forgot password
router.post("/forgot-password", ForgotPassword);
router.post("/check-otp", CheckOTP);
router.post("/reset-password", ResetPassword);

// user logs
router.get("/user-logs/:id", UserLogs);
router.delete("/delete-logs/:id", DeleteLogs);

// delete user account
router.delete("/delete-account/:id", DeleteUserAccount);
export { router as UserRouter };
