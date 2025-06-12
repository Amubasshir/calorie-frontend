import { apiClient } from "../lib/api";
import { APIResponse, AuthResponse, User } from "../types";
import { APIError, handleAPIError } from "../utils/error";

interface AuthResponseData {
  user: User;
  token: string;
}

export const foodService = {
  getAllFoods: async (): Promise<User | null> => {
    try {
      const { data } = await apiClient.get<APIResponse<User>>("/foods/");
      return data.data || null;
    } catch (error) {
      if (error instanceof APIError && error.status === 401) {
        return null;
      }
      throw handleAPIError(error);
    }
  },
  getSingleFood: async (id: string): Promise<User | null> => {
    try {
      const { data } = await apiClient.get<APIResponse<User>>(`/foods/${id}`);
      const {food} = data.data;
      return food || null;
    } catch (error) {
      if (error instanceof APIError && error.status === 401) {
        return null;
      }
      throw handleAPIError(error);
    }
  },
  getAllFoodCategories: async (): Promise<User | null> => {
    try {
      const { data } = await apiClient.get<APIResponse<User>>("/foods/categories");
      return data.data || null;
    } catch (error) {
      if (error instanceof APIError && error.status === 401) {
        return null;
      }
      throw handleAPIError(error);
    }
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const { data } = await apiClient.post<APIResponse<AuthResponseData>>(
        "/auth/login",
        {
          email,
          password,
        }
      );




      console.log("✅✅✅", data)

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
