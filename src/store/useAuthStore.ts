import { create } from "zustand";
import axios from "axios";
import api from "../api/client";
import type { User, ApiResponse, LoginData, LoginInput } from "../types/api";

interface AuthState {
  user: User | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
  login: (
    credentials: LoginInput,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  checkAuth: async () => {
    set({ loading: true });
    try {
      const response = await api.get<ApiResponse<User>>("/auth/me");
      set({ user: response.data.data, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  login: async (credentials) => {
    set({ loading: true });
    try {
      const response = await api.post<ApiResponse<LoginData>>(
        "/auth/login",
        credentials,
      );
      set({ user: response.data.data.user, loading: false });
      return { success: true };
    } catch (error) {
      set({ loading: false });
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Invalid email or password";
        return { success: false, error: message };
      }
      return { success: false, error: "An unexpected error occurred" };
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      set({ user: null, loading: false });
    }
  },
}));
