import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import { pool } from "./src/configs/db.ts";
import { createTable } from "./src/db/models/table.ts";
import homeRoute from "./src/routes/homeRoute.ts";
import authRouter from "./src/routes/authRoute.ts";
import cookieParser from "cookie-parser";
import { rateLimiter } from "./src/middlewares/rateLimiter.ts";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/utils/swagger-docs.ts";

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ratelimiter (only in prod)
if (process.env.NODE_ENV === "production") {
  app.use(rateLimiter);
}

// DB initialization
(async () => {
  try {
    await pool.connect();
    console.log("Connected to DB!");
    // create tables if not exists
    createTable();
  } catch (e) {
    console.error("DB Initialization error:", e);
    process.exit(1);
  }
})();

// swagger documentation ui (only dev)
if (process.env.NODE_ENV === "development") {
  app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// phonebook route
app.use("/", homeRoute);

// authentication route
app.use("/auth", authRouter);

// for rest of the routes
app.use((_, res) => {
  res.status(404).send("Page not found!");
});

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

/*
// close redis and db connection (issue with the imiplementation)
 process.on("SIGINT", async () => {
 await disconnectRedis();
 await disconnectPg();
 process.exit(0);
});
*/
