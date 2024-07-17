import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import dotenv from "dotenv";

export function verifyJWT(req: Request, res: Response, next: any) {
  const accessToken = req.cookies.accessToken;
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    return res.status(500).send("Server error");
  }
  if (!accessToken) {
    return res.status(401).send("Access denied");
  }
  try {
    jwt.verify(accessToken, secret, (err: any, decoded: any) => {
      if (err) {
        return res.status(403);
      }
      req.body.user = decoded;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(400).send("Invalid token");
  }
}
