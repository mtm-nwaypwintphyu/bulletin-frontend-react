import { useCallback, useState } from "react";

import { getErrorMessage } from "../utils/errorHelper";
import type { PaginationInput, User } from "../types/api";
import { userApi } from "../api/user";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

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

  return {
    users,
    loading,
    totalPages,
    total,
    fetchUsers,
    deleteUser,
  };
}
