import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { getStreamToken } from "../controller/chat.controller.js";

const router = Router();

router.get("/token", protectedRoute, getStreamToken);

export default router;
