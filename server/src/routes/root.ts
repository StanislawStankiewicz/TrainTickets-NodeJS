import { Router } from "express";

const rootRouter = Router();

rootRouter.get("/", (req, res) => {
  res.send("Frontend not implemented");
});

export default rootRouter;
