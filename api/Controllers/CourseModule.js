import { dbConnection } from "../Database/database.js";
import fs from "fs";
import path from "path";

	export const CreateCourse = async (req, res) => {
		const file_id = req.batchID;
		const {
			course_code,
			course_title,
			course_category,
			description,
			first_name,
			last_name,
			email,
			user_id,
		} = req.body;

		console.log(
			course_code,
			course_title,
			course_category,
			description,
			first_name,
			last_name,
			email,
			user_id,
		);

		try {
			const newCourseQuery = `
				INSERT INTO courses (course_code, course_title, course_category, description, first_name, last_name, email, user_id, file_id)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
				RETURNING course_id;
			`;
			const courseResult = await dbConnection.query(newCourseQuery, [
				course_code,
				course_title,
				course_category,
				description,
				first_name,
				last_name,
				email,
				user_id,
				file_id,
			]);

			return res
				.status(201)
				.json({message: "Success creating course!" });
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
	const { id } = req.params;

	console.log("This is the id: ", id);

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

		console.log("Filed_id: ", fileId);
		// Use the fileId to get the list of files from the uploads folder
		const filesPath = path.join("./public/uploads");
		const files = fs.readdirSync(filesPath);

		console.log(files);

		const matchingFiles = files.filter((filename) => filename.startsWith(fileId));

		// Generate download links for each file
		const downloadLinks = matchingFiles.map((filename) => {
			return `${req.protocol}://${req.get("host")}/downloads/${filename}`;
		});

		// console.log("Matched files: ", matchingFiles);
		// console.log("This is the downalod links: ", downloadLinks)

		return res
			.status(200)
			.json({ downloadLinks, courseInfoFound, message: "Found info" });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: "Internal server error" });
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

		console.log(foundCourse);

		return res.status(200).json({ foundCourse, message: "Found courses!" });
	} catch (err) {
		console.log(err);
	}
};

// delete course module
export const DeleteCourse = async () => {};




