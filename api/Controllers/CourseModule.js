import { dbConnection } from "../Database/database.js";

export const CreateCourse = async (req, res) => {
	const {
		course_code,
		course_title,
		course_category,
		description,
		course_files,
	} = req.body;

	try {
		const newCourseQuery = `
      INSERT INTO courses (course_code, course_title, course_category, description, course_files)
      VALUES ($1, $2, $3)
    `;

		await dbConnection.query(newCourseQuery, [
			course_code,
			course_title,
			course_category,
			description,
			course_files,
		]);

		res.status(201).json({ message: "New course created" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
};


// retrieve course module
export const RetrieveCourse = async () => {};

// delete course module
export const DeleteCourse = async () => {};
