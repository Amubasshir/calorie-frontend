import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, User } from "../services/auth.service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

//   console.log({user});
  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const user = await authService.getCurrentUser();
      setUser(user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user?.email){
        setIsAuthenticated(true);
    }
  }, [user])

  const login = async (email: string, password: string) => {
    try {
      const { user, error } = await authService.login(email, password)
      console.log({user})
      if (error) throw error;
      setUser(user);
      navigate("/diario");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Login failed");
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const { user, error } = await authService.register(email, password, name);
      if (error) throw error;
      setUser(user);
      navigate("/diario");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Registration failed");
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const loginWithGoogle = async () => {
    await authService.loginWithGoogle();
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    loginWithGoogle,
    isAuthenticated,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
