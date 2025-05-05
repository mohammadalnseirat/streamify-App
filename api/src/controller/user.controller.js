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
