import { useCallback , useState } from "react";

import { getErrorMessage } from "../utils/errorHelper";
import type { PaginationInput, User, FormDraftData } from "../types/api";
import { userApi } from "../api/user";

export function useUsers() {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [formDraft, setFormDraft] = useState<FormDraftData | null>(null);

  const fetchUsers = useCallback(async (pagination?: PaginationInput) => {
    setLoading(true);

    try {
      const response = await userApi.getUsers(pagination);
      setUsers(response.data.data.users);
      setTotalPages(response.data.data.pagination.totalPages ?? 1);
      setTotal(response.data.data.pagination.total ?? 0);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = async (userId: number) => {
    setLoading(true);
    try {
      await userApi.deleteUser(userId);
      return { success: true, message: "User deleted successfully." };
    } catch (error) {
      console.error("Delete user failed", error);
      return {
        success: false,
        message: getErrorMessage(error, "Failed to delete user."),
      };
    } finally {
      setLoading(false);
    }
  };

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

  const clearFormDraft = () => {
    setFormDraft(null);
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
        status: false,
        message: getErrorMessage(error, "User update failed."),
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    users,
    loading,
    totalPages,
    total,
    fetchUsers,
    deleteUser,
    getUserById,
    createUser,
    formDraft,
    setFormDraft,
    clearFormDraft,
    updateUser,
  };
}
