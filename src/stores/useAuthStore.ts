import { create } from "zustand";
import { authApi } from "../api/auth";
import { getErrorMessage } from "../utils/storeHelpers";
import type { User, LoginInput, RegisterInput } from "../types/api";

interface AuthState {
  currentUser: User | null;
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
  changePassword: (
    oldPassword: string,
    newPassword: string,
  ) => Promise<{ success: boolean; message?: string }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  loading: false,
  initialized: false,

  checkAuth: async () => {
    set({ loading: true });
    try {
      const response = await authApi.getMe();
      set({
        currentUser: response.data.data,
        loading: false,
        initialized: true,
      });
    } catch {
      set({ currentUser: null, loading: false, initialized: true });
    }
  },

  login: async (credentials: LoginInput) => {
    set({ loading: true });
    try {
      const response = await authApi.login(credentials);
      set({ currentUser: response.data.data.user, loading: false });
      return { success: true };
    } catch (error) {
      set({ currentUser: null, loading: false });
      return {
        success: false,
        message: getErrorMessage(error, "Login failed!"),
      };
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await authApi.logout();
    } finally {
      set({ currentUser: null, loading: false });
    }
  },
  register: async (registerData: RegisterInput) => {
    set({ loading: true });
    try {
      const response = await authApi.register(registerData);
      set({ currentUser: response.data.data, loading: false });
      return { success: true };
    } catch (error) {
      set({ currentUser: null, loading: false });
      return {
        success: false,
        message: getErrorMessage(error, "Register failed!"),
      };
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
      return {
        success: false,
        message: getErrorMessage(error, "Forgot password failed!"),
      };
    }
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    set({ loading: true });
    try {
      await authApi.updatePassword(oldPassword, newPassword);
      set({ loading: false });
      return { success: true };
    } catch (error) {
      set({ loading: false });
      return {
        success: false,
        message: getErrorMessage(error, "Change password failed!"),
      };
    }
  },
}));
