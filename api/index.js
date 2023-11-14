import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { UserRouter } from "./Routes/Router.js";
import { dbConnection } from "./Database/database.js";
import { CourseRouter } from "./Routes/CourseRouters.js";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
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
 