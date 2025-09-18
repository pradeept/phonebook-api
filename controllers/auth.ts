import { type Request, type Response } from "express";
import * as z from "zod";
import { pool } from "../models/db.ts";
import type { userType } from "../types/userType.ts";
import jwt from "jsonwebtoken";

const findUser = (email: string, password: string) => {
  const query = `SELECT * FROM phonebookapp.user WHERE email='${email}'`;
  return pool.query(query).then((result) => {
    if (result.rowCount) {
      console.log(result.rows[0]);
      if (result.rows[0].password === password) {
        return result.rows[0];
      }
    }
    return null;
  });
};

const generateToken = (user: userType) => {
  return jwt.sign(user, process.env.JWT_SECRET!);
};

const loginController = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  // Validate with zod
  const userData = z.object({
    email: z.string().min(2).max(40),
    password: z.string().max(30).regex(regex),
  });

  if (userData.safeParse({ email, password }).error) {
    res
      .status(400)
      .send(userData.safeParse({ email, password }).error?.message);
  } else {
    const user = await findUser(email, password);
    if (user) {
      const token = generateToken(user);
      res.cookie("token", `Bearer ${token}`);
      res.status(200).send("Success");
    } else {
      res.status(403).send("Forbidden");
    }
  }
};

const signupController = () => {};

export { loginController, signupController };
