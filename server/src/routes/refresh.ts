import { Router } from "express";
import { handleRefreshToken } from "../controllers/refreshTokenController";

const router = Router();

router.get("/refresh", handleRefreshToken);

export default router;
