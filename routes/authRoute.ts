import { Router } from "express";
import { loginController, registerController } from "../controllers/auth.ts";

const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/signup", registerController);

export default authRouter;
