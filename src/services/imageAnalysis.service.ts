import { apiClient } from "../lib/api";
import { APIResponse, AuthResponse, GetAllFoodsParams, User } from "../types";
import { APIError, handleAPIError } from "../utils/error";

interface AuthResponseData {
  user: User;
  token: string;
}

export const imageAnalysisService = {


  analysisImage: async (formData: FormData): Promise<object> => {
    try {
      const { data } = await apiClient.post<APIResponse<AuthResponseData>>(
        "/vision/analyze",
        {
          file: formData
        }
      );

      console.log("✅✅✅", data);

      if (!data.data) {
        throw new APIError("Login failed: No data received");
      }

      const { token, user } = data.data;
      localStorage.setItem("token", token);

      return { user, token };
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  register: async (
    email: string,
    password: string,
    name: string
  ): Promise<AuthResponse> => {
    try {
      // const result = await apiClient.post<APIResponse<AuthResponseData>>(
      const { data } = await apiClient.post<APIResponse<AuthResponseData>>(
        "/auth/register",
        {
          email,
          password,
          fullName: name,
        }
      );

      if (!data.data) {
        throw new APIError("Registration failed: No data received");
      }

      const { token, user } = data.data;
      localStorage.setItem("token", token);

      return { user, token };
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      localStorage.removeItem("token");
    }
  },

  resetPassword: async (email: string): Promise<void> => {
    try {
      await apiClient.post<APIResponse>("/auth/forgot-password", { email });
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  verifyEmail: async (token: string): Promise<void> => {
    try {
      await apiClient.post<APIResponse>("/auth/verify-email", { token });
    } catch (error) {
      throw handleAPIError(error);
    }
  },

  loginWithGoogle: async (): Promise<void> => {
    window.location.href = `${apiClient.defaults.baseURL}/auth/google`;
  },

  handleGoogleCallback: async (code: string): Promise<AuthResponse> => {
    try {
      const { data } = await apiClient.post<APIResponse<AuthResponseData>>(
        "/auth/google/callback",
        { code }
      );

      if (!data.data) {
        throw new APIError("Google login failed: No data received");
      }

      const { token, user } = data.data;
      localStorage.setItem("token", token);

      return { user, token };
    } catch (error) {
      throw handleAPIError(error);
    }
  },
};
