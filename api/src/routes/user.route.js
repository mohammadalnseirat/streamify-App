import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { getMyFriends, getRecommendedUsers } from "../controller/user.controller.js";


const router = Router();

router.use(protectedRoute)

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);



export default router;
