import { type Request, type Response } from "express";
import * as z from "zod";
import type { User } from "../types/userType.ts";
import jwt from "jsonwebtoken";
import { createUser, findUser } from "../models/user.ts";

const generateToken = (user: User) => {
  return jwt.sign(user, process.env.JWT_SECRET!,{expiresIn:60*60}); // expires in 1hr
};

export const loginController = async (req: Request, res: Response) => {
  const body: Partial<User> = req.body;

  if (!body || !body.email || !body.password) {
    res.status(400).send("Invalid request");
  }

  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  // Validate with zod
  const userData = z.object({
    email: z.string().min(2).max(40),
    password: z.string().max(30).regex(regex),
  });

  if (
    userData.safeParse({ email: body.email, password: body.password }).error
  ) {
    res.status(400).send("Please check your email and password format!");
  } else {
    const user = await findUser(body.email!, body.password!);
    if (user) {
      const token = generateToken(user);
      res.cookie("token", `Bearer ${token}`);
      res.status(200).send("Logged in!");
    } else {
      res.status(403).send("Invalid username or password!");
    }
  }
};

export interface RegisterRequest
  extends Omit<User, "id" | "first_name" | "last_name"> {
  firstname: string;
  lastname: string;
}

export const registerController = async (req: Request, res: Response) => {
  const body: RegisterRequest = req.body;

  if (
    !body ||
    !body.firstname ||
    !body.lastname ||
    !body.password ||
    !body.city
  ) {
    // bad request
    return res.status(400).send("Please provide required information!");
  }

  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const userData = z.object({
    first_name: z.string().min(3).max(20),
    last_name: z.string().min(3).max(20),
    city: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(30).regex(regex),
  });

  if (
    userData.safeParse({
      first_name: body.firstname,
      last_name: body.lastname,
      city: body.city,
      email: body.email,
      password: body.password,
    }).error
  ) {
    return res.status(400).send("Please check your details!");
  }

  try {
    const newUser = createUser({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: body.password,
      city: body.city,
    });
    return res.status(201).send(newUser);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send("Something went wrong, please contact the admin!");
  }
};
