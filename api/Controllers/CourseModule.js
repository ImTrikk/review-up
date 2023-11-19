import { dbConnection } from "../Database/database.js";
import { list, getDownloadURL, ref, deleteObject } from "firebase/storage";
import { firebaseStorage } from "../Database/firebase.js";

export const CreateCourse = async (req, res) => {
	const file_id = req.batchID;
	const {
		course_code,
		course_title,
		course_program,
		description,
		first_name,
		last_name,
		email,
		user_id,
		header_url,
	} = req.body;

	try {
		const newCourseQuery = `
				INSERT INTO courses (course_code, course_title, course_program, description, first_name, last_name, email, user_id, file_id, header_url)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
				RETURNING course_id;
			`;
		const courseResult = await dbConnection.query(newCourseQuery, [
			course_code,
			course_title,
			course_program,
			description,
			first_name,
			last_name,
			email,
			user_id,
			file_id,
			header_url,
		]);

		return res.status(201).json({ message: "Success creating course!" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
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

		return res.status(200).json({ allCourses, message: "Courses found!" });
	} catch (err) {
		console.log(err);
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

		if (userCourses.rows.length === 0) {
			return res.status(400).json({ userCourses, messagae: "No create course!" });
		}

		return res.status(200).json({ userCourses, messagae: "User courses" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ messagae: "Internal Server Error" });
	}
};

// ? this is for searching functionatilities
// finding specific courses
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

export const DeleteCourse = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	try {
		const CourseInfo = await dbConnection.query(
			"select file_id from courses where course_id = $1",
			[id],
		);

		const fileID = CourseInfo.rows[0]?.file_id;
		console.log("fileID: ", fileID);

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
						console.log(`File deleted successfully: ${itemRef.name}`);
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
		// Check if the course was found and deleted
		if (CourseData.rowCount === 0) {
			return res.status(404).json({ message: "Course not found" });
		}

		return res.status(200).json({ message: "Course deleted successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};

// save functionality

export const SaveCourse = async (req, res) => {
	const { id } = req.params;
	try {
	} catch (err) {
		return res.status(500).json({ messagae: "Internal server error" });
	}
};
