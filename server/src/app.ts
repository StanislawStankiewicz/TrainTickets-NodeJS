import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db";
import rootRouter from "./routes/root";
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";
import refreshRouter from "./routes/refresh";
import { verifyJWT } from "./middleware/verifyJWT";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/", rootRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/refresh", refreshRouter);

app.use(verifyJWT);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
