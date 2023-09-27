import express from "express"
import { login, signup } from "../Controllers/auth.js"

const router = express.Router()

// auth routers
router.post("/signup", signup)
router.post("/login", login)


export { router as UserRouter }