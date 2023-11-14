import express from "express";
import {
	CreateCourse,
	RetrieveCourse,
	UserCourses,
	getCourseInfo,
} from "../Controllers/CourseModule.js";
import { v4 as uuidv4 } from "uuid";
import {
	upload,
	firebaseUpload,
} from "../MIddleware/FileUploaderMiddleware.js";

const router = express.Router();

// creating courses
router.post(
	"/create-course",
	(req, res, next) => {
		const batchID = uuidv4();
		req.batchID = batchID;
		next();
	},
	upload.array("file"),
	firebaseUpload,
	CreateCourse,
);

// retrieving courses
router.get("/retrieve-course", RetrieveCourse);
router.post("/user-courses", UserCourses);
router.get("/get-course-info/:id", getCourseInfo);
	
export { router as CourseRouter };
