import { Request, Response } from "express";
import * as userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fsPromises from "fs/promises";
import path from "path";

export async function loginUser(req: Request, res: Response) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("Missing email or password");
  }
  try {
    const user = await userModel.loginUser(req.body.email, req.body.password);
    if (!user) {
      return res.status(401).send("Wrong email or password");
    }
    const accessToken = jwt.sign(
      { email: req.body.email },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { email: req.body.email },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "1d" }
    );
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 86400000,
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}
