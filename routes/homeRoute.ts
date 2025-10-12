import { Router } from "express";
import {
  deleteController,
  editController,
  insertController,
  listController,
} from "../controllers/operations.ts";
import { authenticated } from "../middlewares/tokenVerifier.ts";

const homeRoute = Router();

homeRoute.get("/", authenticated, listController);

homeRoute.post("/", insertController);

homeRoute.put("/", editController);

homeRoute.delete("/", deleteController);

export default homeRoute;
