import { dbConnection } from "../Database/database.js";
import { list, getDownloadURL, ref, deleteObject } from "firebase/storage";
import { firebaseStorage } from "../Database/firebase.js";

//todo if the questions data is empty then it will not proceed to create quiz module.

export const CreateCourse = async (req, res) => {
	const file_id = req.batchID;
	const {
		course_code,
		course_title,
		course_program,
		description,
		user_id,
		header_url,
		quiz_name,
	} = req.body;
	const questions = req.body.question;

	try {
		const newCourseQuery = `
            INSERT INTO courses (course_code, course_title, course_program, description, user_id, file_id, header_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING course_id;
        `;

		await dbConnection.query(
			"INSERT INTO logs (message, user_id) VALUES ($1, $2)",
			[`You created the course ${course_title}`, user_id],
		);

		const courseResult = await dbConnection.query(newCourseQuery, [
			course_code,
			course_title,
			course_program,
			description,
			user_id,
			file_id,
			header_url,
		]);
		const course_id = courseResult.rows[0].course_id;

		if (quiz_name !== "") {
			// Mapping over questions
			const mappedQuestions = questions.map((question) => {
				if (question && typeof question === "object") {
					const choicesArray =
						typeof question.choices === "string"
							? question.choices.split(",")
							: question.choices;

					const correctAnswerNumber =
						typeof question.correctAnswer === "string"
							? parseInt(question.correctAnswer, 10)
							: question.correctAnswer;

					return {
						id: question.question_id || 0,
						question: question.question || "",
						choices: Array.isArray(choicesArray) ? choicesArray : ["", "", "", ""],
						correctAnswer: isNaN(correctAnswerNumber) ? 0 : correctAnswerNumber,
					};
				} else {
					return null;
				}
			});

			// Filter out any null values from the mappedQuestions array
			const filteredQuestions = mappedQuestions.filter(
				(question) => question !== null,
			);

			// insert values in quizzes table
			const quizTableQuery = await dbConnection.query(
				"INSERT INTO quizzes(quiz_name, user_id, course_id) VALUES($1, $2, $3) RETURNING quiz_id;",
				[quiz_name, user_id, course_id],
			);

			const quiz_id = quizTableQuery.rows[0].quiz_id;

			// This is for making the quiz
			for (const q of filteredQuestions) {
				const query = {
					text:
						"INSERT INTO questions (quiz_id, question, choices) VALUES($1, $2, $3) RETURNING quest_id",
					values: [quiz_id, q.question, q.choices],
				};
				try {
					const quizQueryResult = await dbConnection.query(query);
					const quest_id = quizQueryResult.rows[0].quest_id;

					const answerTableQuery = await dbConnection.query(
						"INSERT INTO answers (quest_id, hashed_answer) VALUES($1, $2)",
						[quest_id, q.correctAnswer],
					);
				} catch (err) {
					console.log(err);
				}
			}
		}
		return res.status(201).json({ message: "Success creating course!" });
	} catch (err) {
		return res.status(500).json({ message: `Internal server error ${err}` });
	}
};

// retrieve all course module
export const RetrieveCourse = async (req, res) => {
	try {
		const allCourses = await dbConnection.query("select * from courses");

		if (allCourses.rows.length === 0) {
			return res.status(400).json({
				allCourses,
				message: "There are no available courses as of the moment",
			});
		}

		const coursesWithCreator = await Promise.all(
			allCourses.rows.map(async (course) => {
				const userId = course.user_id;

				const courseCreator = await dbConnection.query(
					"select first_name, last_name from users where user_id = $1",
					[userId],
				);

				const creatorName = courseCreator.rows[0];

				return {
					...course,
					creatorName: creatorName,
				};
			}),
		);

		return res.status(200).json({
			coursesWithCreator,
			message: "Found Courses",
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const getCourseInfo = async (req, res) => {
	// id link from the URL
	const { id } = req.params;
	try {
		const courseInfo = await dbConnection.query(
			"select * from courses where course_id = $1",
			[id],
		);
		const courseInfoFound = courseInfo.rows[0];

		if (!courseInfoFound) {
			return res.status(400).json({ message: "Course info doest not exist" });
		}

		const fileId = courseInfoFound.file_id;

		const uploadRef = ref(firebaseStorage, "uploads");

		const result = await list(uploadRef);
		let fileDownloadURLs = [];

		// Use for...	 loop to handle asynchronous operations
		for (const itemRef of result.items) {
			if (itemRef.name.includes(fileId)) {
				try {
					const downloadURL = await getDownloadURL(itemRef);
					fileDownloadURLs.push(downloadURL);
				} catch (error) {
					console.error("Error getting download URL:", error);
				}
			}
		}
		return res
			.status(200)
			.json({ courseInfoFound, fileDownloadURLs, message: "Found info" });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: "Internal server error" });
	}
};

//retrieve users courses
export const UserCourses = async (req, res) => {
	const { user_id } = req.body;

	try {
		const userCourses = await dbConnection.query(
			"select * from courses where user_id = $1",
			[user_id],
		);

		const userData = await dbConnection.query(
			"select first_name, last_name from users where user_id = $1",
			[user_id],
		);
		const creatorName = userData.rows[0];

		if (userCourses.rows.length === 0) {
			return res.status(400).json({ message: "No create course!" });
		}

		const coursesWithCreator = userCourses.rows.map((course) => ({
			...course,
			creatorName: creatorName,
		}));

		return res.status(200).json({
			coursesWithCreator,
			message: "User courses",
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const findCourse = async (req, res) => {
	try {
		const { course_title } = req.body;

		const course = await dbConnection.query(
			"select * from courses where course_title = $1",
			[course_title],
		);

		if (course.rows.length === 0) {
			return res
				.status(400)
				.json({ message: `There is no course title ${course_title}` });
		}
		const foundCourse = course.rows[0];
		return res.status(200).json({ foundCourse, message: "Found courses!" });
	} catch (err) {
		console.log(err);
	}
};

// save functionality
export const SaveCourse = async (req, res) => {
	const { id, user_id } = req.body;
	try {
		const checkCourseID = await dbConnection.query(
			"select * from saved_courses where course_id = $1",
			[id],
		);

		const courseInfo = await dbConnection.query(
			"select course_title from courses where course_id = $1",
			[id],
		);

		const courseInfoResult = courseInfo.rows[0].course_title;

		await dbConnection.query(
			"INSERT INTO logs (message, user_id) VALUES ($1, $2)",
			[`You saved the course ${courseInfoResult}`, user_id],
		);

		if (checkCourseID.rows.length > 0) {
			return res.status(400).json({ message: "Already saved course" });
		}

		const save = await dbConnection.query(
			"insert into saved_courses (user_id, course_id) values ($1, $2)",
			[user_id, id],
		);

		return res.status(201).json({ message: "Course saved!" });
	} catch (err) {
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const RetrieveSavedCourse = async (req, res) => {
	const { user_id } = req.body;

	try {
		const saveCourseData = await dbConnection.query(
			"SELECT * FROM saved_courses WHERE user_id = $1",
			[user_id],
		);

		const courseIDs = saveCourseData.rows.map((row) => row.course_id);
		const courseData = await dbConnection.query(
			"SELECT * FROM courses WHERE course_id = ANY($1::int[])",
			[courseIDs],
		);

		const userIDs = courseData.rows.map((row) => row.user_id);
		const userData = await dbConnection.query(
			"SELECT user_id, first_name, last_name FROM users WHERE user_id = ANY($1::int[])",
			[userIDs],
		);

		const coursesWithUsernames = courseData.rows.map((course) => {
			const user = userData.rows.find((user) => user.user_id === course.user_id);
			return {
				...course,
				authorName: user ? user.first_name + " " + user.last_name : null,
			};
		});

		return res.status(200).json({ coursesWithUsernames });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const RemoveSavedCourse = async (req, res) => {
	const { course_id, user_id } = req.params;
	try {
		const removeSave = await dbConnection.query(
			"delete from saved_courses where course_id = $1 and user_id = $2",
			[course_id, user_id],
		);

		const courseInfo = await dbConnection.query(
			"select course_title from courses where course_id = $1",
			[course_id],
		);

		const courseInfoResult = courseInfo.rows[0].course_title;

		await dbConnection.query(
			"INSERT INTO logs (message, user_id) VALUES ($1, $2)",
			[`You removed ${courseInfoResult} from saved course`, user_id],
		);

		if (removeSave.rowCount > 0) {
			return res.status(200).json({ message: "Course removed successfully" });
		} else {
			return res.status(404).json({ message: "Course not found" });
		}
	} catch (err) {
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const DeleteCourse = async (req, res) => {
	const { id } = req.params;
	try {
		const CourseInfo = await dbConnection.query(
			"select * from courses where course_id = $1",
			[id],
		);

		const quizzesData = await dbConnection.query(
			"select * from quizzes where course_id = $1",
			[id],
		);

		// Check if quizzesData is not empty
		if (quizzesData && quizzesData.rows.length > 0) {
			const quiz_id = quizzesData.rows[0].quiz_id;
			const getQuestIds = await dbConnection.query(
				"SELECT quest_id FROM questions WHERE quiz_id = $1",
				[quiz_id],
			);

			// Check if any rows are returned
			if (getQuestIds.rows.length > 0) {
				for (const row of getQuestIds.rows) {
					const quest_id = row.quest_id;
					const deleteAnswers = await dbConnection.query(
						"DELETE FROM answers WHERE quest_id = $1",
						[quest_id],
					);
				}
			}
			const deleteQueryQuestions = dbConnection.query(
				"delete from questions where quiz_id = $1",
				[quiz_id],
			);

			const deleteQuizzes = await dbConnection.query(
				"delete from quizzes where course_id = $1",
				[id],
			);
		}

		const fileID = CourseInfo.rows[0]?.file_id;

		const user_id = CourseInfo.rows[0]?.user_id;

		const courseInfo = await dbConnection.query(
			"select course_title from courses where course_id = $1",
			[id],
		);

		const courseInfoResult = courseInfo.rows[0].course_title;

		await dbConnection.query(
			"INSERT INTO logs (message, user_id) VALUES ($1, $2)",
			[`You deleted your course: ${courseInfoResult}`, user_id],
		);

		if (fileID) {
			const storageRef = ref(firebaseStorage, "uploads/");
			const result = await list(storageRef);

			// Use for... loop to handle asynchronous operations
			for (const itemRef of result.items) {
				// Check if the file name includes the fileID
				if (itemRef.name.includes(fileID)) {
					try {
						// Delete the file
						await deleteObject(itemRef);
					} catch (error) {
						console.error("Error deleting file:", error);
						return res.status(404).json({ message: "Could not delete files" });
					}
				}
			}
		}

		const CourseData = await dbConnection.query(
			"delete from courses where course_id = $1",
			[id],
		);

		// Check if the course was fund and deleted
		if (CourseData.rowCount === 0) {
			return res.status(404).json({ message: "Course not found" });
		}

		return res.status(200).json({ message: "Course deleted successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const CourseUpdate = async (req, res) => {
	const {
		course_id,
		course_code,
		course_title,
		course_program,
		description,
		user_id,
		header_url,
	} = req.body;

	try {
		const updateCourseQuery = `
      UPDATE courses
      SET course_code = $2, course_title = $3, course_program = $4, description = $5, header_url = $6
      WHERE course_id = $1
      RETURNING course_id;
    `;

		const result = await dbConnection.query(updateCourseQuery, [
			course_id,
			course_code, // Assuming this is the new course code
			course_title,
			course_program,
			description,
			header_url,
		]);

		let logsQuery = await dbConnection.query(
			"INSERT INTO logs (message, user_id) VALUES ($1, $2)",
			[`You updated the course ${course_title}`, user_id],
		);

		return res.status(200).json({ message: "Course updated successfully" });
	} catch (err) {
		console.error("Error during course update:", err);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const DeleteFileUrl = async (req, res) => {
	// this should be retreive from the body
	const { url, user_id } = req.body;
	try {
		// Get a reference to the file using the download URL
		const fileRef = ref(firebaseStorage, url);
		const fileNameWithId = url.split("_")[1];
		const fileNameWithoutId = fileNameWithId.split(".")[0];
		// Delete the file
		await deleteObject(fileRef);

		await dbConnection.query(
			"INSERT INTO logs (message, user_id) VALUES ($1, $2)",
			[`You removed the file:  ${fileNameWithoutId}`, user_id],
		);

		return res.status(200).json({ message: "File deleted successfully" });
	} catch (error) {
		console.error("Error deleting file:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

// add new file
export const AddNewReviewer = async (req, res) => {
	const { course_id, user_id } = req.body;
	try {
		await dbConnection.query(
			"INSERT INTO logs (message, user_id) VALUES ($1, $2)",
			[`You added a new reviewer`, user_id],
		);

		return res.status(201).json({ message: "Added new reviewer" });
	} catch (err) {
		return res.status(500).json({ message: "Internal server error" });
	}
};
