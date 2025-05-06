import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendRequests,
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

router.get("/friend-requests", getFriendRequests);
router.get('/outgoing-friend-requests', getOutgoingFriendRequests)

export default router;
