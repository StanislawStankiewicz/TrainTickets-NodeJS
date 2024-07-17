import { Request, Response } from "express";
import * as userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function handleLogout(req: Request, res: Response) {
  const refreshToken = req.cookies?.jwt;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await userModel.getUserByRefreshToken(refreshToken);
  if (!user) {
    res.clearCookie("jwt");
    return res.sendStatus(403);
  }
  await userModel.deleteRefreshToken(user.id);
  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(204);
}
