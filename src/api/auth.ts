import api from "./client";

import type {
  User,
  ApiResponse,
  LoginInput,
  RegisterInput,
} from "../types/api";

export const authApi = {
  getMe: () => api.get<ApiResponse<User>>("/api/auth/me"),

  login: (credentials: LoginInput) =>
    api.post<ApiResponse<{ user: User }>>("/api/auth/login", credentials),

  logout: () => api.post("/api/auth/logout"),

  register: (registerData: RegisterInput) =>
    api.post<ApiResponse<User>>("/api/auth/register", registerData),

  forgot: (email: string) =>
    api.post<ApiResponse<null>>("/api/auth/forgot-password", { email }),

  reset: (token: string, password: string) =>
    api.post<ApiResponse<{ email: string }>>(
      `/api/auth/reset-password?token=${token}`,
      { password },
    ),

  updatePassword: (currentPassword: string, newPassword: string) =>
    api.post<ApiResponse<null>>("/api/auth/change-password", {
      currentPassword,
      newPassword,
    }),
};
