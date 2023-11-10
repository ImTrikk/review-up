import Pool from "pg";

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
	connectionString:
		"postgres://default:TjhcKo6v4rni@ep-aged-meadow-56946399-pooler.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
});


