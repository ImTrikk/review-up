import bcrypt from "bcrypt";
import { dbConnection } from "../Database/database.js";
import GenerateToken from "../Helpers/GenerateToken.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

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

		const jwtToken = GenerateToken(user.rows[0].user_id);

		await dbConnection.query(
			"INSERT INTO logs (message, user_id) VALUES ($1, $2)",
			[`You logged in your account`, user.rows[0].user_id],
		);

		res.cookie("jwtToken", jwtToken, process.env.ACCESS_TOKEN_SECRET, {
			secure: true,
			httpOnly: true,
			sameSite: "Strict",
		});

		return res.status(200).json({ jwtToken, foundUser, message: "User found" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: err });
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
export const Logout = async (req, res) => {
	const user_id = req.params;
	console.log(user_id);
	try {
		res.cookie("jwtToken", { expires: new Date(0), httpOnly: true });
		res.clearCookie();

		await dbConnection.query(
			"INSERT INTO logs (message, user_id) VALUES ($1, $2)",
			[`You logged out of ReviewUP`, user_id.id],
		);

		return res.status(200).json({ message: "Logout successful" });
	} catch (err) {
		console.log(err);
		// Handle the error appropriately
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// validate token expiration data

export const ValidateToken = async (req, res) => {
	const { token } = req.body; // Assuming the token is sent in the request
	try {
		// Verify the JWT
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		// Check if the token has expired manually
		const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds

		if (decoded.exp && decoded.exp < currentTimestamp) {
			// Token has
			res.status(401).json({ error: "Token has expired" });
		} else {
			// Token is valid
			res.status(200).json({ message: "Token is valid", decoded });
		}
	} catch (err) {
		// Other JWT verification errors
		console.error("JWT verification failed:", err);
		res.status(401).json({ error: "Unauthorized" });
	}
};

// forgot password endpoint logic

export const ForgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		// make logic for sending code to the email

		const user = await dbConnection.query(
			"SELECT email from users where email = $1",
			[email],
		);

		if (user.rows.length === 0) {
			return res.status(400).json({ message: "User does not exist" });
		}
		const foundUser = user.rows[0];

		// implement send otp code for reset
		if (foundUser) {
			const verifyEmail = await OtpVerificationEmail({
				user_id: user.rows[0].user_id,
				email: email,
			});
		}

		return res.status(200).json({ message: "Email sent" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const ResetPassword = async (req, res) => {
	const { email, newPassword } = req.body;
	try {
		const hashed_password = await bcrypt.hash(newPassword, 10);
		const user = await dbConnection.query(
			"update users  set hashed_password = $1 where email = $2",
			[hashed_password, email],
		);

		return res.status(200).json({ message: "Password reset successful" });
	} catch (err) {
		return res.status(500).json({ message: `Internal server error: ${err}` });
	}
};

let sentCode;

export const CheckOTP = async (req, res) => {
	const { concatenatedCode } = req.body;
	try {
		if (concatenatedCode === sentCode) {
			return res.status(200).json({ message: "Verified" });
		} else {
			return res.status(400).json({ message: "Wrong OTP" });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: err });
	}
};

// function for sending verification to user's CARSU account
const OtpVerificationEmail = async ({ user_id, email }) => {
	try {
		//  provide a 6 digit code to the client email
		const otp = `${Math.floor(100000 + Math.random() * 900000)}`;

		const emailTransporter = nodemailer.createTransport({
			service: "gmail",
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: process.env.GMAIL_ACCOUNT,
				pass: process.env.GMAIL_ACCOUNT_PASSWORD,
			},
		});

		const mailOptions = {
			from: process.env.GMAIL_ACCOUNT,
			to: email,
			subject: "Your Verification Code",
			text: `Your verification code is: ${otp}. \n Please do not share this one time password with anyone for security purposes`,
		};
		//  for checking responses only
		const info = await emailTransporter.sendMail(mailOptions);
		sentCode = otp;
		return otp;
	} catch (err) {
		console.log(err);
	}
};

export const UserLogs = async (req, res) => {
	const user_id = req.params;
	try {
		let logsQuery = await dbConnection.query(
			"select * from logs where user_id = $1",
			[user_id.id],
		);
		const logs = logsQuery.rows;
		return res.status(200).json({ logs, message: "Retrieved logs" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const DeleteLogs = async (req, res) => {
	const user_id = req.params;
	try {
		const deleteQuery = await dbConnection.query(
			"delete from logs where user_id = $1",
			[user_id.id],
		);

		return res.status(200).json({ message: "Logs deleted successfuly" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const DeleteUserAccount = async (req, res) => {
	const user_id = req.params;
	console.log(user_id.id);

	try {
		const deleteUserQuery = await dbConnection.query(
			"DELETE FROM users WHERE user_id = $1",
			[user_id.id],
		);

		// Check if any rows were affected to determine if the user was found and deleted
		if (deleteUserQuery.rowCount === 1) {
			return res.status(200).json({ message: "Account deleted successfully" });
		} else {
			return res.status(404).json({ message: "User not found" });
		}
	} catch (err) {
		console.error("Error deleting user:", err);
		return res.status(500).json({ message: "Internal server error" });
	}
};
