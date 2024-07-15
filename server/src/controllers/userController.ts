import { Request, Response } from "express";
import User from "../models/userModel";

export async function createUser(req: Request, res: Response) {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}
