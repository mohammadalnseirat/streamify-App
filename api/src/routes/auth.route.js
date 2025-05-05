import { Router } from "express";
import {
  logInUser,
  logOutUser,
  signUpUser,
} from "../controller/auth.controller.js";

const router = Router();

router.post("/sign-up", signUpUser);
router.post("/log-in", logInUser);
router.post("/log-out", logOutUser);

export default router;
