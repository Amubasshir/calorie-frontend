import axios, { AxiosError, AxiosResponse } from "axios";
import { APIResponse } from "../types";
import { APIError } from "../utils/error";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new APIError("Request failed", undefined, undefined));
  }
);

// // Add a response interceptor to handle errors
// apiClient.interceptors.response.use(
//   (response: AxiosResponse<APIResponse>) => {
//     if (!response.data.success) {
//       throw new APIError(
//         response.data.message || "Operation failed",
//         response.status,
//         response.data.errors
//       );
//     }
//     return response;
//   },
//   (error: AxiosError<APIResponse>) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }

//     throw new APIError(
//       error.response?.data?.message || "Operation failed",
//       error.response?.status,
//       error.response?.data?.errors
//     );
//   }
// );
