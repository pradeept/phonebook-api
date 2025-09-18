import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { userType } from "../types/userType.ts";

const authenticated = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;

  jwt.verify(
    cookies["token"].split(" ")[1],
    process.env.JWT_SECRET!,
    (err: any, decoded: any) => {
      if (err) {
        console.error(err);
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      //@ts-ignore
      req.user = decoded as userType;
      next();
    }
  );
};

export { authenticated };
