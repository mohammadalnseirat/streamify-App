import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { handleError } from "../utils/error.js";
import { upsertUserStream } from "../lib/stream.js";
//! 1- Function to sign up a user:
export const signUpUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    //! valdations:
    if (
      !fullName ||
      !email ||
      !password ||
      email === "" ||
      fullName === "" ||
      password === ""
    ) {
      return next(handleError(403, "All fields are required"));
    }
    // validate passowrd:
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      return next(
        handleError(
          400,
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
      );
    }
    // validate email:
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(handleError(400, "Invalid email address"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        handleError(400, "Email already exists, please use a diffrent one")
      );
    }

    //! profile picture:
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomProfilePicture = `https://avatar.iran.liara.run/public/${idx}.png`;

    //! create new User:
    const newUser = await User.create({
      fullName,
      email,
      password,
      profilePicture: randomProfilePicture,
    });

    //! create user in stream:
    try {
      await upsertUserStream({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePicture || "",
      });

      console.log(`Stream user created for ${newUser.fullName}`);
    } catch (error) {
      console.error("Error creating stream user:", error);
    }

    //! generate token:
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      });
    } else {
      return next(handleError(500, "Invalid user data"));
    }
  } catch (error) {
    console.error("Error in sign up user controller:", error);
    next(error);
  }
};

//! 2- Function to log in a user:
export const logInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
      return next(handleError(403, "All fields are required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(
        handleError(401, "Invalid email or Password, Please try again later!")
      );
    }

    const isMatchPassword = await user.matchPassword(password);
    if (!isMatchPassword) {
      return next(handleError(401, "Invalid email or Password"));
    }

    //! generate token:
    if (user) {
      generateTokenAndSetCookie(user._id, res);
      res.status(200).json({ success: true, user });
    } else {
      return next(handleError(401, "Invalid Credentials"));
    }
  } catch (error) {
    console.error("Error in log in user controller:", error);
    next(error);
  }
};

//! 3- Function to log out a user:
export const logOutUser = async (req, res, next) => {
    res.clearCookie("jwt_token");
    res.status(200).json({ success: true, message: "Logout successful" });
};

//! 4- Function to onboarding a user:
export const onboardingUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { fullName, bio, location, nativeLanguage, learningLanguage } =
      req.body;
    //! validate the inputs:
    if (
      !fullName ||
      !bio ||
      !location ||
      !nativeLanguage ||
      !learningLanguage
    ) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !location && "location",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
        ].filter(Boolean),
      });
    }
    //! update the user:
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      {
        new: true,
      }
    ).select("-password");
    if (!updatedUser) {
      return next(handleError(404, "User not found"));
    }
    //! update the user in stream:
    try {
      await upsertUserStream({
        id: updatedUser._id,
        name: updatedUser.fullName,
        image: updatedUser.profilePicture || "",
      });
      console.log(`Stream user updated for ${updatedUser.fullName}`);
    } catch (error) {
      console.error("Error updating stream user:", error);
    }
    //! return the updated user:
    return res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in onboarding user controller:", error);
    next(error);
  }
};
