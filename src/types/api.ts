export interface User {
  id: number;
  name: string;
  email: string;
  profile: string;
  type: "ADMIN" | "USER" | string;
  phone: string | null;
  address: string | null;
  dob: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginData {
  user: User;
  rememberMe: boolean;
}

export interface ApiResponse<T> {
  status: "success" | "fail" | "error";
  message?: string;
  data: T;
}
