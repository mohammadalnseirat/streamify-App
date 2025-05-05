import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/user.model.js";
import { handleError } from "../utils/error.js";

//! 1- Function to get recommended users:
export const getRecommendedUsers = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, //exclude current user
        { _id: { $nin: currentUser.friends } }, //exclude current user's friends
        { isOnboarded: true }, //only onboarded users
      ],
    });

    //! 2- Send response:
    return res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers controller: ", error);
    next(error);
  }
};

//! 2- Function to get my Friends:
export const getMyFriends = async (req, res, next) => {
  try {
    const currentUserId = req.user._id;

    const user = await User.findById(currentUserId)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePicture nativeLanguage learningLanguage"
      );

    //! 2- Send response:
    return res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends controller: ", error);
    next(error);
  }
};

//! 3- Function to send friend request:
export const sendFriendRequest = async (req, res, next) => {
  try {
    const myId = req.user._id;
    const { id: recipientId } = req.params;

    if (myId === recipientId) {
      return next(handleError(400, "You can't send friend request to yourself"));
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return next(handleError(404, "Recipient not found"));
    }

    //! check if already freinds:
    if (recipient.friends.includes(myId)) {
      return next(handleError(400, "You are already friends with this user"));
    }

    //! check if the request already sent:
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId }
      ]
    });

    if (existingRequest) {
      return next(handleError(400, "Friend request already sent"));
    }

    //! create new friend request:
    const newFriendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    //! send response:
    return res.status(201).json(newFriendRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest controller: ", error);
    next(error);
  }
};
