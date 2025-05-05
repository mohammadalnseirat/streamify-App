import { Router } from "express";
import {
  logInUser,
  logOutUser,
  onboardingUser,
  signUpUser,
} from "../controller/auth.controller.js";
import { protectedRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/sign-up", signUpUser);
router.post("/log-in", logInUser);
router.post("/log-out", logOutUser);

router.post("/on-boarding", protectedRoute, onboardingUser);

router.get("/me", protectedRoute, (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
});

export default router;
