import { axiosInstance } from "./axios";

//! Function to signup:
export const signup = async (userData) => {
  const response = await axiosInstance.post("/auth/sign-up", userData);
  return response.data;
};

//! Function to login:
export const login = async (userData) => {
  const response = await axiosInstance.post("/auth/log-in", userData);
  return response.data;
};

//! Function to logout:
export const logout = async () => {
  const res = await axiosInstance.post("/auth/log-out");
  return res.data;
};

//! Function to get auth user:
export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

//! Function to complete onboarding:
export const completeOnboarding = async (userData) => {
  const res = await axiosInstance.post("/auth/on-boarding", userData);
  return res.data;
};

//! Function to get the user friends:
export const getUserFriends = async () => {
  const res = await axiosInstance.get("/users/friends");
  return res.data;
};

//! Function to get the recommended users:
export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
};

//! Function to get the outgoing requests:
export const getOutgoingRequests = async () => {
  const res = await axiosInstance.get("/users/outgoing-friend-requests");
  return res.data;
};

//! Function to send a friend request:
export const sendFriendRequest = async (userId) => {
  const res = await axiosInstance.post(`/users/friend-request/${userId}`);
  return res.data;
};

//! Function to get the friend requests:
export const getFriendRequests = async () => {
  const res = await axiosInstance.get("/users/friend-requests");
  return res.data;
};

//! Function to accept a friend request:
export const acceptFriendRequest = async (userId) => {
  const res = await axiosInstance.put(`/users/friend-request/${userId}/accept`);
  return res.data;
};

//! Function to reject a friend request:
export const rejectFriendRequest = async (userId) => {
  const res = await axiosInstance.put(`/users/friend-request/${userId}/reject`);
  return res.data;
};

// ! Function to get the stream token:
export const getStreamToken = async () => {
  const res = await axiosInstance.get("/chat/token");
  return res.data;
};
