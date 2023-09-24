import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { UserRouter } from "./Routes/Router.js";

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

app.use("/api", UserRouter)

// add database connection here


app.listen(6000, () => console.log("Web app running on localhost 6000"));
