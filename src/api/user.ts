import api from "./client";

import type {
  PaginationInput,
  UserListResponse,
  ApiResponse,
  User,
} from "../types/api";

export const userApi = {
  getUsers: (pagination?: PaginationInput) =>
    api.get<ApiResponse<UserListResponse>>("/api/users", {
      params: pagination,
    }),

  createUser: (userData: Partial<User>, file?: File | null) => {
    if (file) {
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      formData.append("profile", file);
      return api.post<ApiResponse<{ user: User }>>(
        "/api/users",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
    }
    return api.post<ApiResponse<{ user: User }>>("/api/users", userData);
  },

  deleteUser: (userId: number) =>
    api.delete<ApiResponse<null>>(`/api/users/${userId}`),

  getUserById: (userId: number) =>
    api.get<ApiResponse<{ user: User }>>(`/api/users/${userId}`),

  updateUser: (userId: number, userData: Partial<User>, file?: File | null) => {
    if (file) {
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
      formData.append("profile", file);
      return api.patch<ApiResponse<{ user: User }>>(
        `/api/users/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
    }
    return api.patch<ApiResponse<{ user: User }>>(
      `/api/users/${userId}`,
      userData,
    );
  },

};
