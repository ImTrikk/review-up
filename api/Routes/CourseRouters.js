import express, { Router } from "express";
import { CreateCourse, RetrieveCourse } from "../Controllers/CourseModule.js";
import { upload } from "../MIddleware/FileMulter.js";

const router = express.Router();

// creating courses
router.post("/create-course", upload.array("file"), CreateCourse);

// retrieving courses
router.get("/get-course", RetrieveCourse);

export { router as CourseRouter };
