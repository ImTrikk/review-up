import express from "express";
import { TwoFactorAuth, login, signup } from "../Controllers/auth.js";
import { Userinfo } from "../Controllers/Userinfo.js";

const router = express.Router();

// auth routers
router.post("/signup", signup);
router.post("/login", login);
router.get("/user-info", Userinfo);
router.post("/auth-user", TwoFactorAuth);
// router.post('/resend-verify', )

export { router as UserRouter };
