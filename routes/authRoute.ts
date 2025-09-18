import { Router } from "express";
import { loginController, signupController } from "../controllers/auth.ts";

const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/signup", signupController);

export default authRouter;
