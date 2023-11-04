import express from "express";
import { login, signup } from "../Controllers/auth.js";
import { Userinfo } from "../Controllers/Userinfo.js";
import { TwoFactorAuth, checkEmailValidity } from "../MIddleware/CheckValidEmail.js";
import {
	checkEligibleEmail,
	sendOtp,
} from "../MIddleware/CheckValidEmail.js";

const router = express.Router();

// auth routers and initial endpoint with middlewres
router.post("/send-otp", checkEligibleEmail, sendOtp);
router.post("/send-otp-login", checkEmailValidity, sendOtp);
router.post("/signup", TwoFactorAuth, signup)
router.post("/login", TwoFactorAuth, login);
router.get("/user-info", Userinfo);

export { router as UserRouter };
