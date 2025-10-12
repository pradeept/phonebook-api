import { configDotenv } from "dotenv";
configDotenv();
import { Pool } from "pg";

export const pool = new Pool({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export const disconnectPg = async () => {
  await pool.end();
  console.log("DB Connection closed!");
};
