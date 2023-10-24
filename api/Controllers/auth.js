import bcrypt from "bcrypt";
import { dbConnection } from "../Database/database.js";
import jwtGenerator from "../../src/utils/jwtGenerator.js";
import nodemailer from "nodemailer";
import { buildUrl } from "../../src/utils/buildUrl.js";
import fetch from "node-fetch";

let globalCode;
let compressedData;

// login endpoint
export const login = async (req, res) => {
 try {
  const { email, password } = req.body;

  const user = await dbConnection.query(
   "SELECT * from users where email = $1",
   [email],
  );

  const foundUser = user.rows[0];
  console.log("Found user: ", foundUser);

  if (user.rows.length === 0) {
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

  const jwtToken = jwtGenerator(user.rows[0].user_id);
  console.log(jwtToken);
  res.cookie(jwtToken, "secret");

  // Call the verification email function with user_id and email
  const verifyEmail = await OtpVerificationEmail({
   user_id: user.rows[0].user_id,
   email: email,
  });
  console.log("Verification: ", verifyEmail);

  globalCode = verifyEmail;
  console.log("global code: ", globalCode);

  compressedData = { foundUser, jwtToken };

  return res.status(200).json({ message: "User found" });
 } catch (err) {
  console.log(err);
 }
};

// signup endpoint
export const signup = async (req, res) => {
 try {
  const { first_name, last_name, email, phone, password } = req.body;

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

  // const jwtToken = jwtGenerator(user.rows[0].user_id);
  res.status(201).json({ newUserQuery, message: "New user created!" });
 } catch (err) {
  console.log(err);
  res.status(500).json({ message: "Internal server error" });
 }
};

export const TwoFactorAuth = async (req, res) => {
 const { concatenatedCode } = req.body;

 try {
  if (concatenatedCode === globalCode) {
   res.cookie(compressedData.jwtToken);

   return res
    .status(200)
    .json({ compressedData, message: "Verified email account" });
  } else {
   return res.status(400).json({ message: "Wrong One time password" });
  }
 } catch (err) {
  console.log(err);
 }
};

// Verification email function
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

  // Send the verification email
  const mailOptions = {
   from: "reviewupofficial@gmail.com",
   to: email,
   subject: "Your Verification Code",
   text: `Your verification code is: ${otp}`,
  };

  const info = await emailTransporter.sendMail(mailOptions);
  console.log("Verification email sent:", info.response);

  return otp;
 } catch (err) {
  console.log(err);
 }
};
