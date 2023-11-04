import bcrypt from "bcrypt";
import { dbConnection } from "../Database/database.js";
import jwtGenerator from "../../src/utils/jwtGenerator.js";
import nodemailer from "nodemailer";
import { buildUrl } from "../../src/utils/buildUrl.js";
import fetch from "node-fetch";

// login endpoint
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await dbConnection.query(
			"SELECT * from users where email = $1",
			[email],
		);

		if (user.rows.length === 0) {
			return res.status(400).json({ message: "User does not exist" });
		}
		const foundUser = user.rows[0];
		const result = await dbConnection.query(
			"SELECT hashed_password from users where email = $1",
			[email],
		);
		const { hashed_password } = result.rows[0];
		const validatePassword = await bcrypt.compare(password, hashed_password);

		if (!validatePassword) {
			return res.status(400).json({ message: "Wrong password" });
		}

		const jwtToken = jwtGenerator(user.rows[0].user_id);
		res.cookie(jwtToken, "secret");

		console.log("Token: ", jwtToken)
		console.log("User logged in: ", foundUser)

		return res.status(200).json({jwtToken, foundUser, message: "User found" });
	} catch (err) {
		console.log(err);
	}
};



// signup endpoint
export const signup = async (req, res) => {
	console.log("Nexxtttsss.......")
	 const { userData } = req;
	console.log("User data: ", userData)
	try {
		const [first_name, last_name, email, password, phone] = userData;
		console.log(first_name, last_name, email, password, phone)

		// Check if the email already exists
		const existingEmail = await dbConnection.query(
			"SELECT * FROM users WHERE email = $1",
			[email],
		);

		if (existingEmail.rows.length > 0) {
			return res.status(400).json({ message: "User already exists!" });
		}
		// Insert a new user into the database using parameterized query
		const newUserQuery = `
      INSERT INTO users (first_name, last_name, email, hashed_password, phone)
      VALUES ($1, $2, $3, $4, $5)
    `;
		const hashed_password = await bcrypt.hash(password, 10);
		await dbConnection.query(newUserQuery, [
			first_name,
			last_name,
			email,
			hashed_password,
			phone,
		]);

		res.status(201).json({ newUserQuery, message: "New user created!" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error" });
	}
};

