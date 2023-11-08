import express, { Router } from "express";
import { CreateCourse, RetrieveCourse } from "../Controllers/CourseModule.js";
import { upload } from "../MIddleware/FileMulter.js";
import { v4 as uuidv4 } from "uuid";

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
	CreateCourse,
);


// retrieving courses
router.get("/retrieve-course", RetrieveCourse);

export { router as CourseRouter };
