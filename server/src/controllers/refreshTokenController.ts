import { Request, Response } from "express";
import * as userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function handleRefreshToken(req: Request, res: Response) {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const user = await userModel.getUserByRefreshToken(refreshToken);
  if (!user) return res.sendStatus(403);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!,
    (err: any, decoded: any) => {
      if (err || user.name !== decoded.username) {
        return res.status(403);
      }
      const accessToken = jwt.sign(
        { username: user.name },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "15m" }
      );
      res.json({ accessToken });
    }
  );
}
