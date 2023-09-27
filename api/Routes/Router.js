import express from "express"
import { login, signup } from "../Controllers/auth.js"
import { Userinfo } from "../Controllers/Userinfo.js"

const router = express.Router()

// auth routers
router.post("/signup", signup)
router.post("/login", login)
router.get("/user-info", Userinfo)


export { router as UserRouter }