import { dbConnection } from "../Database/database.js";

export const CreateCourse = async (req, res) => {
	const {
		course_code,
		course_title,
		course_category,
		description,
		fileList,
		noteList,
		user_id,
	} = req.body;

	console.log(fileList);
	console.log(noteList);

	console.log("User ID: ", user_id);

	try {
		const newCourseQuery = `
	     INSERT INTO courses (course_code, course_title, course_category, description, user_id)
	     VALUES ($1, $2, $3, $4, $5)
	   `;

		const courseResult = await dbConnection.query(newCourseQuery, [
			course_code,
			course_title,
			course_category,
			description,
			user_id,
		]);

		if (courseResult.rows.length === 0) {
			// Handle the case where no rows were returned (e.g., due to a failed insert)
			return res.status(500).json({ message: "Failed to create the course" });
		}

		const course_id = courseResult.rows[0].course_id;

		const newFileQuery = `
	     INSERT INTO files (file_name, course_id)
	     VALUES ($1, $2)
	   `;
		await dbConnection.query(newFileQuery, [fileList.name, course_id]);

		const newNoteQuery = `
	     INSERT INTO notes (note_name, course_id)
	     VALUES ($1, $2)
	   `;
		await dbConnection.query(newNoteQuery, [noteList.name, course_id]);

		return res.status(201).json({ message: "Success creating course!" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

// retrieve course module
export const RetrieveCourse = async (req, res) => {
	try {
		const allCourses = await dbConnection.query("select * from courses");

		console.log("These are all the courses available: ", allCourses);

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
