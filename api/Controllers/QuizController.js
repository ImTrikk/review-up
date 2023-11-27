import { dbConnection } from "../Database/database.js";

export const GetQuiz = async (req, res) => {
	const { id } = req.params;
	console.log("This is the id: ", id);
	try {
		const quizInfo = await dbConnection.query(
			"select * from quizzes where course_id = $1",
			[id],
		);
		const quiz_id = quizInfo.rows[0].quiz_id;
		const retrievedQuizInfo = quizInfo.rows[0];

		const questions = await dbConnection.query(
			"select * from questions where quiz_id = $1",
			[quiz_id],
		);
		const questionsResults = questions.rows;

		return res.status(200).json({
			retrievedQuizInfo,
				message: "Quiz information retrieved",
		});
	} catch (err) {
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const QuizInfo = async (req, res) => {
	const { id } = req.params;
	const quiz_id = id;
	console.log("QuizID: ", quiz_id);
	console.log("Test endpoint QuizInfo");
	try {
		const questions = await dbConnection.query(
			"select * from questions where quiz_id = $1",
			[quiz_id],
		);
		const questionsResults = questions.rows;

		return res
			.status(200)
			.json({ questionsResults, message: "Retrieved Questions" });
	} catch (err) {
		return res.status(500).json({ message: "Interal server error" });
	}
};
export const CheckQuiz = async (req, res) => {
	try {
	} catch (err) {
		return res.status(500).json({ message: "Interal server error" });
	}
};
