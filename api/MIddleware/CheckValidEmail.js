import { dbConnection } from "../Database/database.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

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
			console.log("Email already taken");
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
		const { email } = req.body;
		const emailExist = await dbConnection.query(
			"SELECT * from users where email = $1",
			[email],
		);
		const foundEmail = emailExist.rows[0];
		if (!foundEmail) {
			return res.status(400).json({ message: "Email does not exist!" });
		}
		return next();
	} catch (err) {
		console.log(err);
	}
};

// sending verification code to email
export const sendOtp = async (req, res, next) => {
	console.log("Verifying email.....");
	try {
		const { email } = req.body;
		console.log("This is the email: ", email);

		// send otp to email
		const verifyEmail = await OtpVerificationEmail({
			// user_id: user.rows[0].user_id,
			email: email,
		});
		console.log("This is the verificiation: ", verifyEmail);
		sentCode = verifyEmail;
		console.log("Succes sent code....");

		//unto the next middleware which is the 2FA mail verfication
		return res.status(200).json({ message: "OTP code sent to email account" });
	} catch (err) {
		console.log(err);
	}
};

// checks compare the 2FA code from the front end back end
export const TwoFactorAuth = async (req, res, next) => {
	const { userData, concatenatedCode } = req.body;
	console.log("This is the user data: ", userData);
	console.log(concatenatedCode);
	try {
		if (concatenatedCode === sentCode) {
			console.log("Equal code");
			req.userData = userData
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
				user: "reviewupofficial@gmail.com",
				pass: "hase uosx uyks fhrq",
			},
		});

		const mailOptions = {
			from: "reviewupofficial@gmail.com",
			to: email,
			subject: "Your Verification Code",
			text: `Your verification code is: ${otp}`,
		};

		//  for checking responses only
		const info = await emailTransporter.sendMail(mailOptions);
		console.log("Verification email sent:", info.response);

		return otp;
	} catch (err) {
		console.log(err);
	}
};
