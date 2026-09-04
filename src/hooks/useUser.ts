import { useCallback, useState } from "react";

import { getErrorMessage } from "../utils/errorHelper";
import type { User } from "../types/api";
import { userApi } from "../api/user";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserById = useCallback(async (userId: number) => {
    setLoading(true);
    try {
      const response = await userApi.getUserById(userId);
      const fetchedUser = response.data?.data.user;
      setUser(fetchedUser);
      return {
        success: true,
        message: "User fetch successfully.",
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error, "Failed to fetch user."),
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = async (userData: Partial<User>, file?: File | null) => {
    setLoading(true);
    try {
      const response = await userApi.createUser(userData, file);
      return {
        success: true,
        message: "User created successfully.",
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error, "User creation failed."),
      };
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (
    userId: number,
    userData: Partial<User>,
    file?: File | null,
  ) => {
    setLoading(true);
    try {
      await userApi.updateUser(userId, userData, file);
      return {
        success: true,
        message: "User updated successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error, "User update failed."),
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    getUserById,
    createUser,
    updateUser,
  };
}
