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
