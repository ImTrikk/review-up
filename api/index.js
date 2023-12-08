// serverless.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { UserRouter } from "./Routes/Router.js";
import { dbConnection } from "./Database/database.js";
import helmet from "helmet";
import { CourseRouter } from "./Routes/CourseRouters.js";

const app = express();

// Middleware setup
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}),
);

// Content Security Policy setup
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			scriptSrc: ["'self'", "https://review-up.vercel.app"],
		},
	}),
);

// Ensure the database connection is established before starting the server
dbConnection
	.connect()
	.then(() => {
		// Routes that depend on the database can be added here
		app.use("/api/course", CourseRouter);
		app.use("/api/auth", UserRouter);
		// Set the server timeout to 10 minutes (adjust as needed)
		app.timeout = 600000;

		// Start the server
		app.listen(4242, () => {
			console.log("Server running on localhost 4242");
		});

		console.log("Connected to postgre");
	})
	.catch((err) => {
		console.error("Error connecting with the PostgreSQL database");
		console.error(err);
		process.exit(1); // Exit the process with an error code
	});
