import { create } from "zustand";

import { userApi } from "../api/user";
import { getErrorMessage } from "../utils/storeHelpers";

import type { User, PaginationInput } from "../types/api";

export interface FormDraftData {
  name: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
  type: string;
  address: string;
  profile: File | null;
  previewUrl: string | null;
}

interface UserState {
  users: User[];
  user?: User;
  loading: boolean;
  initialized: boolean;
  totalPages: number;
  total: number;
  formDraft: FormDraftData | null;
  fetchUsers: (pagination?: PaginationInput) => Promise<void>;
  createUser: (
    userData: Partial<User>,
    file?: File | null,
  ) => Promise<{ success: boolean; message?: string }>;
  deleteUser: (
    userId: number,
  ) => Promise<{ success: boolean; message?: string }>;
  getUserById: (userId: number) => Promise<void>;
  updateUser: (
    userId: number,
    userData: Partial<User>,
    file?: File | null,
  ) => Promise<{ success: boolean; message?: string }>;
  setFormDraft: (data: FormDraftData) => void;
  clearFormDraft: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  initialized: false,
  totalPages: 1,
  total: 0,
  formDraft: null,

  setFormDraft: (data) => set({ formDraft: data }),
  clearFormDraft: () => set({ formDraft: null }),

  fetchUsers: async (pagination) => {
    set({ loading: true });
    try {
      const response = await userApi.getUsers(pagination);
      set({
        users: response.data.data.users,
        totalPages: response.data.data.pagination.totalPages ?? 1,
        total: response.data.data.pagination.total ?? 0,
        loading: false,
        initialized: true,
      });
    } catch {
      set({
        users: [],
        totalPages: 1,
        total: 0,
        loading: false,
        initialized: true,
      });
    }
  },

  createUser: async (userData: Partial<User>, file?: File | null) => {
    set({ loading: true });
    try {
      const response = await userApi.createUser(userData, file);
      set({ user: response.data.data.user, loading: false });
      return { success: true, message: response.data.message };
    } catch (error) {
      set({ loading: false });
      return {
        success: false,
        message: getErrorMessage(error, "Failed to create user."),
      };
    }
  },

  deleteUser: async (userId: number) => {
    set({ loading: true });
    try {
      const response = await userApi.deleteUser(userId);
      set({ loading: false });
      return { success: true, message: response.data.message };
    } catch (error) {
      set({ loading: false });
      return {
        success: false,
        message: getErrorMessage(error, "Failed to delete user."),
      };
    }
  },

  getUserById: async (userId: number) => {
    set({ loading: true });
    try {
      const response = await userApi.getUserById(userId);
      set({ user: response.data.data.user, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  updateUser: async (
    userId: number,
    userData: Partial<User>,
    file?: File | null,
  ) => {
    set({ loading: true });
    try {
      const response = await userApi.updateUser(userId, userData, file);
      set({ user: response.data.data.user, loading: false });
      return { success: true, message: response.data.message };
    } catch (error) {
      set({ loading: false });
      return {
        success: false,
        message: getErrorMessage(error, "Failed to update user."),
      };
    }
  },
}));
