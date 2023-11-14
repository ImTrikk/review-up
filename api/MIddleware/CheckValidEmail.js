import { dbConnection } from "../Database/database.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let sentCode;

// check email if already taken or not
export const checkEligibleEmail = async (req, res, next) => {
	try {
		const { email } = req.body;

		const emailExist = await dbConnection.query(
			"SELECT * from users where email = $1",
			[email],
		);

		const foundEmail = emailExist.rows[0];

		if (foundEmail) {
			return res.status(400).json({ message: "Email already taken" });
		}

		return next();
	} catch (err) {
		console.log(err);
	}
};

// check existing email for loggin in
export const checkEmailValidity = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const emailExist = await dbConnection.query(
			"SELECT * from users where email = $1",
			[email],
		);
		const foundEmail = emailExist.rows[0];
		if (!foundEmail) {
			return res.status(400).json({ message: "User does not exist" });
		}

		const result = await dbConnection.query(
			"SELECT hashed_password from users where email = $1",
			[email],
		);
		const { hashed_password } = result.rows[0];
		const validatePassword = await bcrypt.compare(password, hashed_password);

		if (!validatePassword) {
			return res.status(400).json({ message: "Wrong password" });
		}

		return next();
	} catch (err) {
		console.log(err);
	}
};

// sending verification code to email
export const sendOtp = async (req, res, next) => {
	try {
		const { email } = req.body;

		// send otp to email
		const verifyEmail = await OtpVerificationEmail({
			// user_id: user.rows[0].user_id,
			email: email,
		});
		sentCode = verifyEmail;
		//unto the next middleware which is the 2FA mail verfication
		return res.status(200).json({ message: "OTP code sent to email account" });
	} catch (err) {
		console.log(err);
	}
};

// checks compare the 2FA code from the front end back end
export const TwoFactorAuth = async (req, res, next) => {
	const { userData, concatenatedCode } = req.body;
	try {
		if (concatenatedCode === sentCode) {
			req.userData = userData;
			return next();
		} else {
			return res.status(400).json({ message: "Wrong otp password!" });
		}
	} catch (err) {
		console.log(err);
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

		return otp;
	} catch (err) {
		console.log(err);
	}
};
