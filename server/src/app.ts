import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db";

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Node.js!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
