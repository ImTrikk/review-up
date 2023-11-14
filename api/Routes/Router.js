import express from "express";
import { Logout, ValidateToken, login, signup } from "../Controllers/auth.js";
import {
	TwoFactorAuth,
	checkEmailValidity,
} from "../MIddleware/CheckValidEmail.js";
import { checkEligibleEmail, sendOtp } from "../MIddleware/CheckValidEmail.js";
import { AuthToken } from "../MIddleware/AuthToken.js";

const router = express.Router();

// auth routers and initial endpoint with middlewres

// for signup otp
router.post("/send-otp", checkEligibleEmail, sendOtp);

//for login otp
router.post("/send-otp-login", checkEmailValidity, sendOtp);
router.post("/signup", TwoFactorAuth, signup);
router.post("/login", TwoFactorAuth, login);
router.delete("/logout", Logout);

router.post("/validate-token", ValidateToken);

export { router as UserRouter };



