import type { User } from "../types/userType.ts";
import jwt from "jsonwebtoken";

export const generateToken = (user: User) => {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: 60 * 60 }); // expires in 1hr
};
