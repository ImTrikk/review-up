import express from "express"
import { login, signin } from "../Controllers/auth.js"

const router = express.Router()


// auth routers
router.post("/sigin", signin)
router.post("/login", login)


export { router as UserRouter }