import { Request, Response } from "express";
import * as userModel from "../models/userModel";

async function loginUser(req: Request, res: Response) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("Missing email or password");
  }
  try {
    const match = await userModel.loginUser(req.body.email, req.body.password);
    if (!match) {
      return res.status(401).send("Wrong email or password");
    }
    res.status(200).send("Login successful");
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}
