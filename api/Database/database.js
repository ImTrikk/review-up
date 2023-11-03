import Pool from "pg";

export const dbConnection = new Pool.Pool({
 user: "postgres",
 password: "trikkgwapo123",
 host: "localhost",
 port: 5432,
 database: "ReviewupDB",
});


