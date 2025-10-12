import { configDotenv } from "dotenv";
configDotenv();
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { disconnectPg, pool } from "./configs/db.ts";
import { createTable } from "./models/table.ts";
import homeRoute from "./routes/homeRoute.ts";
import authRouter from "./routes/authRoute.ts";
import cookieParser from "cookie-parser";
import { rateLimiter } from "./middlewares/rateLimiter.ts";
import { disconnectRedis } from "./configs/redis.ts";

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(rateLimiter);

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

// close redis and db connection
process.on("SIGINT", async () => {
  await disconnectRedis();
  await disconnectPg();
  process.exit(0);
});
