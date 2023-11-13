import { dbConnection } from "../Database/database.js";
import { list, getDownloadURL, ref } from "firebase/storage";
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
		header_url
	} = req.body;

	console.log(
		course_code,
		course_title,
		course_program,
		description,
		first_name,
		last_name,
		email,
		user_id,
		header_url
	);

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
		// console.log("These are all the courses available: ", allCourses);

		if (allCourses.rows.length === 0) {
			return res
				.status(400)
				.json({ message: "There are no available courses as of the moment" });
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

		if (!courseInfo) {
			return res.status(400).json({ message: "Course info doest not exist" });
		}

		console.log(courseInfoFound);

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

		console.log("Urls: ", fileDownloadURLs);

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
	
	const { user_id } = req.body

	try {

		const userCourses = await dbConnection.query("select * from courses where user_id = $1", [user_id])

		
		if (!userCourses.rows.length === 0) {
			return res.status(400).json({ messagae: "No create course!" })
		}

		return res.status(200).json({userCourses, messagae: "User courses"})

	} catch (err) { 
		return res.status(500).json({ messagae: "Internal Server Error"})
		console.log(err)
	}
}

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

		console.log(foundCourse);

		return res.status(200).json({ foundCourse, message: "Found courses!" });
	} catch (err) {
		console.log(err);
	}
};

// delete course module
export const DeleteCourse = async () => {};
