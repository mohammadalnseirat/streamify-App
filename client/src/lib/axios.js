import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_URL}/api/v1`;
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
