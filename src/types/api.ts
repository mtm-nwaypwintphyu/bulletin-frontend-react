export interface User {
  id: number;
  name: string;
  email: string;
  profile?: string | null;
  type?: string;
  phone?: string | null;
  address?: string | null;
  dob?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  status: "success" | "error" | "fail";
  message?: string;
  data: T;
}

export interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  dob?: string;
  address?: string;
}
