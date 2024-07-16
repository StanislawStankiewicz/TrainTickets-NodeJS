import { Request, Response } from "express";
import * as userModel from "../models/userModel";

// export async function registerUser(req: Request, res: Response) {
//   try {
//     let user = new userModel.User(req.body);
//     const hashedPassword = req.body.hashedPassword;
//     user = await userModel.registerUser(user, hashedPassword);
//     res.status(201).send(user);
//   } catch (error) {
//     console.error(error);
//     res.status(400).send(error);
//   }
// }
