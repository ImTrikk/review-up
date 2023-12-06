import express from "express";
import {
	CourseUpdate,
	CreateCourse,
	DeleteCourse,
	DeleteFileUrl,
	RemoveSavedCourse,
	RetrieveCourse,
	RetrieveSavedCourse,
	SaveCourse,
	UserCourses,
	getCourseInfo,
} from "../Controllers/CourseModule.js";
import { v4 as uuidv4 } from "uuid";
import {
	upload,
	firebaseUpload,
} from "../MIddleware/FileUploaderMiddleware.js";
import {
	CheckQuiz,
	GetQuiz,
	QuizData,
	QuizInfo,
} from "../Controllers/QuizController.js";

const router = express.Router();

// creating courses
router.post(
	"/create-course",
	(req, res, next) => {
		const batchID = uuidv4();
		req.batchID = batchID;
		next();
	},
	upload.any("file"),
	firebaseUpload,
	CreateCourse,
);
router.get("/retrieve-course", RetrieveCourse);
router.post("/user-courses", UserCourses);
router.get("/get-course-info/:id", getCourseInfo);
router.post("/save", SaveCourse);
router.post("/retrieve-save", RetrieveSavedCourse);
router.get("/saved-courses/:id", RetrieveSavedCourse);
router.delete("/remove-saved/:course_id/:user_id", RemoveSavedCourse);
router.delete("/delete-course/:id", DeleteCourse);

router.post(
	"/course-update/:file_id",
	(req, res, next) => {
		const { file_id } = req.params;
		req.batchID = file_id;
		next();
	},
	upload.any("file"),
	firebaseUpload,
	CourseUpdate,
);

router.post("/deleteFile", DeleteFileUrl);

router.get("/quiz/:id", GetQuiz);
router.get("/get-quiz-questions/:id", QuizData);
router.get("/quiz/get-info/:id", QuizInfo);
router.post("/quiz/check-quiz", CheckQuiz);

export { router as CourseRouter };
