import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { User } from "../types/userType.ts";

const authenticated = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  if (!cookies) {
    return res.status(400).send("Bad Request!");
  }
  if (!cookies["token"]) {
    return res.status(401).send("Forbidden!");
  }
  jwt.verify(
    cookies["token"].split(" ")[1],
    process.env.JWT_SECRET!,
    (err: any, decoded: any) => {
      if (err) {
        console.error(err);
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      //@ts-ignore
      req.user = decoded as User;
      next();
    }
  );
};

export { authenticated };
