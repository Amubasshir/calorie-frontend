import { User as SupabaseUser } from "@supabase/supabase-js";

export interface Food {
  id: string;
  name: string;
  brand?: string;
  category?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar?: number;
  fiber?: number;
  sodium?: number;
  serving: string;
  image: string;
}

export interface SearchHistory {
  query: string;
  timestamp: number;
}

export interface UserProfile extends SupabaseUser {
  name?: string;
}

export interface AuthError {
  message: string;
  status?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isEmailVerified: boolean;
  createdAt: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface AuthResponse {
  user: User;
  token: string;
}
