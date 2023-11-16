import Pool from "pg";
import dotenv from "dotenv";
dotenv.config();

// localhost connections
// export const dbConnection = new Pool.Pool({
//  user: "postgres",
//  password: "trikkgwapo123",
//  host: "localhost",
//  port: 5432,
//  database: "ReviewupDB",
// });

// const { Pool } = require("pg");
// require("dotenv").config(;)

// for vercel postgre database
export const dbConnection = new Pool.Pool({
	connectionString: process.env.POSTGRE_DATABASE_CONNECTION_URL,
});


