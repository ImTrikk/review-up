import Pool from "pg";
import dotenv from "dotenv";
dotenv.config();

// for vercel postgre database
export const dbConnection = new Pool.Pool({
	connectionString: process.env.POSTGRE_DATABASE_CONNECTION_URL,
	connectionTimeoutMillis: 60000,
	idleTimeoutMillis: 60000,
});
