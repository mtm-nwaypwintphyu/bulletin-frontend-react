import { create } from "zustand";
import type { User, LoginInput, RegisterInput } from "../types/api";
import { authApi } from "../api/auth";
import axios from "axios";

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  checkAuth: () => Promise<void>;
  login: (
    credentials: LoginInput,
  ) => Promise<{ success: boolean; message?: string }>;

  logout: () => Promise<void>;
  register: (
    registerData: RegisterInput,
  ) => Promise<{ success: boolean; message?: string }>;

  forgot: (email: string) => Promise<{ success: boolean; message?: string }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  initialized: false,

  checkAuth: async () => {
    set({ loading: true });
    try {
      const response = await authApi.getMe();
      set({ user: response.data.data, loading: false, initialized: true });
    } catch {
      set({ user: null, loading: false, initialized: true });
    }
  },

  login: async (credentials: LoginInput) => {
    set({ loading: true });
    try {
      const response = await authApi.login(credentials);
      set({ user: response.data.data.user, loading: false });
      return { success: true };
    } catch (error) {
      set({ user: null, loading: false });
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Login failed!";
        return { success: false, message };
      }
      return { success: false, message: "An unexpected error occured" };
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await authApi.logout();
      set({ user: null, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },
  register: async (registerData: RegisterInput) => {
    set({ loading: true });
    try {
      const response = await authApi.register(registerData);
      set({ user: response.data.data, loading: false });
      return { success: true };
    } catch (error) {
      set({ user: null, loading: false });
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Register failed!";
        return { success: false, message };
      }
      return { success: false, message: "An unexpected error occured" };
    }
  },
  forgot: async (email: string) => {
    set({ loading: true });
    try {
      await authApi.forgot(email);
      set({ loading: false });
      return { success: true };
    } catch (error) {
      set({ loading: false });
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Forgot password failed!";
        return { success: false, message };
      }
      return { success: false, message: "An unexpected error occured" };
    }
  },
}));
