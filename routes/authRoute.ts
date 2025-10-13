import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/authentication.ts";

/**
 * @swagger
 * /login:
 *  get:
 *    summary: Login to the service.
 *    parameters:
 *      - in: path
 *        email: string
 *    responses:
 *      "200":
 *        description: A JWT token cookie and a object
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                status: string
 *                message: string 
 */

const authRouter = Router();
authRouter.post("/login", loginController);
authRouter.post("/signup", registerController);

export default authRouter;
