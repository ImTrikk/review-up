import { dbConnection } from "../Database/database.js";

export const GetQuiz = async (req, res) => {
	const { id } = req.params;
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
	try {
		const QuizInfoQuery = await dbConnection.query(
			"select first_name, last_name, quiz_name from quizzes inner join users on quizzes.user_id = users.user_id where quiz_id = $1",
			[id],
		);
		const quizInfo = QuizInfoQuery.rows[0];
		return res.status(200).json({ quizInfo, message: "Retrieved information" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const QuizData = async (req, res) => {
	const { id } = req.params;
	const quiz_id = id;
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
	const { id, quizData } = req.body;
	console.log("Quiz ID: ", id);
	console.log("Quiz Data", quizData);
	try {
		const quizDataQuery = await dbConnection.query(
			"select quest_id from questions where quiz_id = $1",
			[id],
		);
		// Log each quest_id if there are multiple rows
		quizDataQuery.rows.forEach(async(row) => {
			console.log("Quest ID: ", row.quest_id);
			const hashedAnswerQuery = await dbConnection.query('select hashed_answer from answers where quest_id = $1', [row.quest_id])
			hashedAnswerQuery.rows.forEach(async (row) => { 
				console.log("Hashed Answer: ", row.hashed_answer)
			})
		});
		return res.status(200).json({ message: "Checked user quiz" });
	} catch (err) {
		console.log("There was an error in server");
		return res.status(500).json({ message: "Interal server error" });
	}
};
