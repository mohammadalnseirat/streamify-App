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
      return next(
        handleError(400, "You can't send friend request to yourself")
      );
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
        { sender: recipientId, recipient: myId },
      ],
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

//! 4- Function to accept friend request:
export const acceptFriendRequest = async (req, res, next) => {
  try {
    const { id: requestId } = req.params;
    const currentUserId = req.user._id;

    //! check if the request exists:
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return next(handleError(404, "Friend request not found"));
    }

    // ! Verify the current user is the recipient
    if (friendRequest.recipient.toString() !== currentUserId) {
      return next(
        handleError(403, "You are not authorized to accept this request")
      );
    }

    if (friendRequest.status === "accepted") {
      return next(handleError(400, "Friend request already accepted"));
    }

    //! update the request status:
    friendRequest.status = "accepted";
    await friendRequest.save();

    // ! Add each other to friends list
    // $addToSet: adds elements to an array only if they do not already exist.
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    //! send response:
    return res
      .status(200)
      .json({ message: "Friend request accepted successfully" });
  } catch (error) {
    console.error("Error in acceptFriendRequest controller: ", error);
    next(error);
  }
};

//! 6- Function to get friend requests:
export const getFriendRequests = async (req, res, next) => {
  try {
    //! get the pending friend requests:
    const incomingFriendRequests = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePicture nativeLanguage learningLanguage"
    );

    //! get the accepted friend requests:
    const acceptedFriendRequests = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate(
      "recipient",
      "fullName profilePicture"
    );

    //! send response:
    return res.status(200).json({
      incomingFriendRequests,
      acceptedFriendRequests,
    });
  } catch (error) {
    console.error("Error in getFriendRequests controller: ", error);
    next(error);
  }
};

//! 7- Function to get outgoing friend requests:
export const getOutgoingFriendRequests = async (req, res, next) => {
  try {
    const outgoingFriendRequests = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    //! send response:
    return res.status(200).json(outgoingFriendRequests);
  } catch (error) {
    console.error("Error in getOutgoingFriendRequests controller: ", error);
    next(error);
  }
};

//  5- Function to reject friend request:
// export const rejectFriendRequest = async (req, res, next) => {
//   try {
//     const { id: requestId } = req.params;
//     const currentUserId = req.user._id;

//     //! check if the request exists:
//     const friendRequest = await FriendRequest.findById(requestId);
//     if (!friendRequest) {
//       return next(handleError(404, "Friend request not found"));
//     }

//     // ! Verify the current user is the recipient
//     if (friendRequest.recipient.toString() !== currentUserId) {
//       return next(handleError(403, "You are not authorized to reject this request"));
//     }

//     //! update the request status:
//     friendRequest.status = "rejected";
//     await friendRequest.save();

//     //! send response:
//     return res
//       .status(200)
//       .json({ message: "Friend request rejected successfully" });
//   } catch (error) {
//     console.error("Error in rejectFriendRequest controller: ", error);
//     next(error);
//   }
// };
