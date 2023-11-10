import express, { Router } from "express";
import {
	CreateCourse,
	RetrieveCourse,
	getCourseInfo,
} from "../Controllers/CourseModule.js";
import { v4 as uuidv4 } from "uuid";
import { upload, firebaseUpload } from "../MIddleware/FileUploaderMiddleware.js";

const router = express.Router();

// creating courses
router.post(
	"/create-course",
	(req, res, next) => {
		// Generate a single batch ID for this request
		const batchID = uuidv4();
		// Pass the batch ID to multer storage configuration
		req.batchID = batchID;
		// Continue to the CreateCourse controller
		next();
	},
	upload.array("file"),
	firebaseUpload,
	CreateCourse,
);


// retrieving courses
router.get("/retrieve-course", RetrieveCourse);

router.get("/get-course-info/:id", getCourseInfo)

export { router as CourseRouter };
