import bcrypt from "bcrypt";
import { dbConnection } from "../Database/database.js";
import GenerateToken from "../Helpers/GenerateToken.js";
import jwt from "jsonwebtoken";

// login endpoint
export const login = async (req, res) => {
	const { userData } = req;
	try {
		const { email, password } = userData;

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

		const expirationDate = new Date();
		expirationDate.setTime(expirationDate.getTime() + 2 * 60 * 1000);

		// const expirationDate = "12h";

		// const jwtToken = jwt.sign(
		// 	{ userId: user.rows[0].user_id }, // Wrap user_id in an object
		// 	process.env.ACCESS_TOKEN_SECRET,
		// 	{
		// 		expiresIn: expirationDate,
		// 	},
		// );

		const jwtToken = GenerateToken(user.rows[0].user_id);

		// Set the cookie with an expiration date //one day from now

		res.cookie(jwtToken, process.env.ACCESS_TOKEN_SECRET, {
			expires: expirationDate,
			httpOnly: true,
		});

		return res.status(200).json({ jwtToken, foundUser, message: "User found" });
	} catch (err) {
		console.log(err);
	}
};

// signup endpoint
export const signup = async (req, res) => {
	const { userData } = req;
	try {
		const { first_name, last_name, email, password, phone } = userData;

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

// logout functionality
export const Logout = (req, res) => {
	try {
		res.cookie("jwtToken", "", { expires: new Date(0), httpOnly: true });
		res.clearCookie();

		return res.status(200).json({ message: "Logout successful" });
	} catch (err) {
		console.log(err);
		// Handle the error appropriately
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const ValidateToken = async (req, res) => {
	const { token } = req.body; // Assuming the token is sent in the request

	try {
		// Verify the JWT
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		// Check if the token has expired manually
		const currentTimestamp = Math.floor(Date.now() / 1000); // Get current time in seconds
		if (decoded.exp < currentTimestamp) {
			// Token has expired
			console.error("JWT verification failed: Token has expired");
			return res.status(401).json({ error: "Token has expired" });
		}

		// If verification is successful, you can do additional logic here
		// For example, you can check if the user associated with the token exists in your database

		// Send a success response
		res.status(200).json({ message: "Token is valid", decoded });
	} catch (err) {
		// Other JWT verification errors
		console.error("JWT verification failed:", err);
		res.status(401).json({ error: "Unauthorized" });
	}
};
