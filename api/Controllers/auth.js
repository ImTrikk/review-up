import bcrypt from "bcrypt";
import { dbConnection } from "../Database/database.js";

// login endpoint
export const login = async (req, res) => {
 try {
  const { email, password } = req.body;

  const user = await dbConnection.query(
   "SELECT * from users where email = $1",
   [email]
  );
  if (user.rows.length === 0) {
   return res.status(400).json("User does not exist");
  } 
  const result = await dbConnection.query(
   "SELECT hashed_password from users where email = $1",
   [email]
  );
  const { hashed_password } = result.rows[0];
  const validatePassword = await bcrypt.compare(password, hashed_password)

  if(!validatePassword){
    return res.status(400).json({message: "Wrong password"})
  }
  return res.status(200).json({ message: "User found" });
 } catch (err) {
  console.log(err);
 }
};

// signup endpoint
export const signup = async (req, res) => {
 console.log("api checker");
 try {
  const { first_name, last_name, email, phone, password } = req.body;

  // Check if the email already exists
  const existingEmail = await dbConnection.query(
   "SELECT * FROM users WHERE email = $1",
   [email]
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
