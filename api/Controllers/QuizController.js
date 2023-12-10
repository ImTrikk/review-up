import { dbConnection } from "../Database/database.js";

// creating new quiz
export const CreateQuiz = async (req, res) => {
	const { quiz_name, user_id, course_id } = req.body;
	const questions = req.body.question;

	try {
		if (quiz_name !== "" || quiz_name != undefined) {
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
		return res.status(201).json({ message: "Quiz created" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const GetQuiz = async (req, res) => {
	const { id } = req.params;
	try {
		const quizInfo = await dbConnection.query(
			"select * from quizzes where course_id = $1",
			[id],
		);
		const quiz_id = quizInfo.rows[0].quiz_id;
		const retrievedQuizInfo = quizInfo.rows;

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
	const { id, quizData, user_id, quiz_name } = req.body;
	let score = 0;
	try {
		for (const quizItem of quizData) {
			const hashedAnswerQuery = await dbConnection.query(
				"SELECT hashed_answer FROM answers WHERE quest_id = $1",
				[quizItem.quest_id],
			);

			if (hashedAnswerQuery.rows.length > 0) {
				const correctHashedAnswer = hashedAnswerQuery.rows[0].hashed_answer;
				if (quizItem.choiceIndex == correctHashedAnswer) {
					score++;
				}
			}
		}

		await dbConnection.query(
			"INSERT INTO logs (message, user_id) VALUES ($1, $2)",
			[`You took the quiz ${quiz_name} and scored ${score}`, user_id],
		);

		return res.status(200).json({ score, message: "Checked user quiz" });
	} catch (err) {
		console.log("There was an error in the server");
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const DeleteQuiz = async (req, res) => {
	const quiz_id = req.params;
	const { user_id, quizNameDelete } = req.body;
	try {
		const quizQuery = await dbConnection.query(
			"delete from quizzes where quiz_id = $1",
			[quiz_id.id],
		);

		await dbConnection.query(
			"INSERT INTO logs (message, user_id) VALUES ($1, $2)",
			[`You deleted the quiz: ${quizNameDelete}`, user_id],
		);

		return res.status(200).json({ message: "Quiz delete" });
	} catch (err) {
		return res.status(500).json({ message: "Internal server error" });
	}
};
