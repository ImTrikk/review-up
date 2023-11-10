import express from "express";
import { Logout, login, signup } from "../Controllers/auth.js";
import { Userinfo } from "../Controllers/Userinfo.js";
import {
	TwoFactorAuth,
	checkEmailValidity,
} from "../MIddleware/CheckValidEmail.js";
import { checkEligibleEmail, sendOtp } from "../MIddleware/CheckValidEmail.js";
import { CreateCourse } from "../Controllers/CourseModule.js";

const router = express.Router();

// auth routers and initial endpoint with middlewres
router.post("/send-otp", checkEligibleEmail, sendOtp);
router.post("/send-otp-login", checkEmailValidity, sendOtp);
router.post("/signup", TwoFactorAuth, signup);
router.post("/login", TwoFactorAuth, login);
router.get("/user-info", Userinfo);
router.post("/logout", Logout);

// add middle ware to check for tokens
// router.post("/create-course", upload.array("file"), CreateCourse);


export { router as UserRouter };



