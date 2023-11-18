import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { UserRouter } from "./Routes/Router.js";
import { dbConnection } from "./Database/database.js";
import { CourseRouter } from "./Routes/CourseRouters.js";
import helmet from "helmet";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}),
);

// sets Content Security Policy
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'", " https://review-up.vercel.app"],
			fontSrc: ["'self'", "https://fonts.gstatic.com"],
			styleSrc: ["'self'", "styles.example.com", ""],
		},
		reportOnly: true,
		reportUri: "/",
	}),
);

app.use("/api/auth", UserRouter);
app.use("/api/course", CourseRouter);

dbConnection.connect().then(() => { 
	console.log("Postgre connection success")
}).catch((err) => { 
	console.log("Error connecting with vercel postgre DB")
	console.log(err)
})

app.listen(4242, () => console.log("Server running on localhost 4242"));
 