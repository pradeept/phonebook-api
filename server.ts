import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import { pool } from "./configs/db.ts";
import { createTable } from "./models/table.ts";
import homeRoute from "./routes/homeRoute.ts";
import authRouter from "./routes/authRoute.ts";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

(async () => {
  try {
    await pool.connect();
    console.log("Connected to DB!");

    createTable();
  } catch (e) {
    console.error("DB Initialization error:", e);
    process.exit(1);
  }
})();

app.use("/", homeRoute);

app.use("/auth", authRouter);

app.use((req, res) => {
  res.status(404).send("Page not found!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
