import bcrypt from "bcrypt";
import { dbConnection } from "../Database/database.js";

// login endpoint
export const login = async (req, res) => {
 console.log("checj login api");
 try {
  const { email, password } = req.body;

  const findEmail = await dbConnection.query(
   "SELECT * from users where email = $1",
   [email]
  );

  console.log(findEmail)

  if(findEmail){
    return res.status(400).json({message: "Email does not exist!"})
  }

  const hashedPassword = await dbConnection.query(
   "SELECT * from users where email = $1 and hashed_password = $2",
   [email, password]
  );

  if (password != hashedPassword) {
   return res.status(400).json({ message: "Invalid Login" });
  } else {
   return res.status(200).json({ message: "User found" });
  }
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
