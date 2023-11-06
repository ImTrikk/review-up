import { dbConnection } from "../Database/database.js";

export const CreateCourse = async (req, res) => {
	const {
		course_code,
		course_title,
		course_category,
		description,
		fileList,
		noteList,
	} = req.body;

	try {
		const newCourseQuery = `
	     INSERT INTO courses (course_code, course_title, course_category, description, files, notes)
	     VALUES ($1, $2, $3, $4, $5, $6)
	   `;

		await dbConnection.query(newCourseQuery, [
			course_code,
			course_title,
			course_category,
			description,
		]);

		res.status(201).json({ message: "New course created" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}

	return res.status(200).json({ fileList, noteList });
};


// retrieve course module
export const RetrieveCourse = async () => {};

// delete course module
export const DeleteCourse = async () => {};
