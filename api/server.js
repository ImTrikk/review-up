import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { UserRouter } from "./Routes/Router.js";
import { dbConnection } from "./Database/database.js";


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
 cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
 })
);

app.use("/api/auth", UserRouter);

// add database connection here
dbConnection.connect((err) => {
 if (err) {
  console.log("error connecting to postgre db", err);
 } else {
  console.log("Connected to PostgreSQL Database");
 }
});


app.listen(6000, () => console.log("Server running on localhost 6000"));
