import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as userModel from "../models/userModel";

export async function registerUser(req: Request, res: Response) {
  try {
    let user: userModel.IUser = new userModel.User(req.body.user);
    const password = req.body.password;
    if (!password || !user) {
      return res.status(400).send("Missing password or user");
    }
    if (password.length < 8) {
      return res.status(400).send("Password must be at least 8 characters");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await userModel.registerUser(user, hashedPassword);
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}
