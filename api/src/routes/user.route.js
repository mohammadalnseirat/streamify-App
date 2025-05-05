import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import {
  acceptFriendRequest,
  getMyFriends,
  getRecommendedUsers,
  sendFriendRequest,
} from "../controller/user.controller.js";

const router = Router();

router.use(protectedRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

//TODO: add route to reject friend request

export default router;
