import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/authentication.ts";
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the service.
 *     requestBody:
 *       description: User email and password.
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password with at least one capital letter,
 *                              one lowercase letter, one digit, and one symbol.
 *     responses:
 *       "200":
 *         description: Successful login, returns a JWT token in a cookie and user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                   description: Status of the login request.
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                   description: Success message returned upon successful authentication.
 *                 token:
 *                   type: string
 *                   description: JWT token that can be used for authenticated requests.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJpYXQiOjE2Mzg2MDY4NzV9.XJZnA7OqPjJzFi3bXU6wd8Aaf7LkISlKqxFjOaK4STg"
 *       "400":
 *         description: Bad request due to missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Invalid email or password"
 *       "401":
 *         description: Unauthorized, incorrect credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       "500":
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while processing your request."
 * /auth/register:
 *   post:
 *     summary: Register to the service.
 *     requestBody:
 *       description: User's first name, last name, email, password, and city.
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The user's first name.
 *               lastname:
 *                 type: string
 *                 description: The user's last name.
 *               city:
 *                 type: string
 *                 description: The user's city.
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password with at least one capital letter,
 *                              one lowercase letter, one digit, and one symbol.
 *     responses:
 *       "201":
 *         description: Successful registration, returns the new user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                   description: Status of the registration request.
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       "400":
 *         description: Bad request due to missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Invalid email or password"
 *       "401":
 *         description: Unauthorized, incorrect credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       "500":
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while processing your request."
 */

const authRouter = Router();
authRouter.post("/login", loginController);
authRouter.post("/register", registerController);

export default authRouter;
