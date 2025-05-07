import { axiosInstance } from "./axios"

export const signup = async (userData) => {
  const response = await axiosInstance.post('/auth/sign-up',userData)
  return response.data
}