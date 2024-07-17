import { Router } from "express";
import { handleLogout } from "../controllers/logoutController";

const router = Router();

router.post("/logout", handleLogout);

export default router;
