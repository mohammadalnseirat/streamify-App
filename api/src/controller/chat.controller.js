import { generateStreamToken } from "../lib/stream.js";

export const getStreamToken = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const token = await generateStreamToken(userId);

    //! send response:
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error in getStreamToken controller: ", error);
    next(error);
  }
};
