import { StreamChat } from "stream-chat";
import "dotenv/config";

const streamApiKey = process.env.STREAM_API_KEY;
const streamApiSecret = process.env.STREAM_API_SECRET;

if (!streamApiKey || !streamApiSecret) {
  console.error("Stream API key or Secret is missing");
}

const streamClient = StreamChat.getInstance(streamApiKey, streamApiSecret);

//! 1- Function to create or update user in the stream:
export const upsertUserStream = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting user in stream:", error);
  }
};

//! 2- Function to generate stream token:
export const generateStreamToken = async (userId) => {
  try {
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating stream token:", error);
    throw error;
  }
};
