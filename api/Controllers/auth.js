import { dbConnection } from "../Database/database.js";

export const login = async (req, res) => {
 try {
  const { email, password } = req.body;
 } catch (err) {
  console.log(err);
 }
};

export const signup = async (req, res) => {
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
      INSERT INTO users (first_name, last_name, email, password, phone)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const hashedPassword = await bcrypt.hash(password, 10);

  await dbConnection.query(newUserQuery, [
   first_name,
   last_name,
   email,
   hashedPassword,
   phone,
  ]);

  res.status(201).json({ message: "New user created!" });
 } catch (err) {
  console.log(err);
  res.status(500).json({ message: "Internal server error" });
 }
};
