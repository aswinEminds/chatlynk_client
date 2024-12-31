// Import the configured Axios instance
import { axiosInstance } from "../interceptors/AxiosInterceptor";

// API call for user signup
export const signupUser = async (userData) => {
  try {
    console.log(userData);
    const response = await axiosInstance.post("/api/users/signup", userData);
    return response.data; // Return successful response data
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

// API call for user login
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/api/users/login", credentials);
    console.log(response);
    return response.data; // Return successful response data
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
