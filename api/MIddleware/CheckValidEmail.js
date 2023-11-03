import { dbConnection } from "../Database/database.js";

export const checkEligibleEmail = async (req, res, next) => {
	console.log("Checking email validity....");
	try {
		const { email } = req.body;

		const emailExist = await dbConnection.query(
			"SELECT * from users where email = $1",
			[email],
		);

		const foundEmail = emailExist.rows[0];
		console.log(foundEmail)

		if (foundEmail) {
			return res.status(400).json({ message: "Email already taken" });
		}

		return next();
	} catch (err) {
		console.log(err);
	}
};
