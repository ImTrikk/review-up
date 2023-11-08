import { dbConnection } from "../Database/database.js";


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
			.json({ courseResult, message: "Success creating course!" });
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

		// Retrieve files associated with the course from the file system
    const files = course.files.map((filePath) => {
      // You can   the file path based on your directory structure
      const fileFullPath = path.join(__dirname, 'uploads', filePath);
      return fileFullPath;
    });

		return res
			.status(200)
			.json({ fileList, noteList, allCourses, message: "Courses found!" });
	} catch (err) {
		console.log(err);
	}
};

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




