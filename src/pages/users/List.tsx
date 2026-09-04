import { useEffect, useState, type SubmitEvent } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useUsers } from "../../hooks/useUsers";

import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import Pagination from "../../components/ui/Pagination";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import UserDetailModal from "../../components/common/UserDetailModal";

import { PAGINATION } from "../../utils/constants";

export default function UserList() {
  const { users, totalPages, total, fetchUsers, deleteUser } = useUsers();

  const [page, setPage] = useState(1);
  const limit = PAGINATION.DEFAULT_LIMIT;
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchFromDate, setSearchFromDate] = useState("");
  const [searchToDate, setSearchToDate] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [localSearchQuery, setLocalSearchQuery] = useState({
    name: "",
    email: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    fetchUsers({ page, limit });
  }, [fetchUsers, page]);

  const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalSearchQuery({
      name: searchName,
      email: searchEmail,
      fromDate: searchFromDate,
      toDate: searchToDate,
    });
  };

  const filteredUsers = users.filter((user) => {
    const matchesName = user.name
      .toLowerCase()
      .includes(localSearchQuery.name.toLowerCase());
    const matchesEmail = user.email
      .toLowerCase()
      .includes(localSearchQuery.email.toLowerCase());
    const matchesFromDate = localSearchQuery.fromDate
      ? new Date(user.createdAt ?? "") >= new Date(localSearchQuery.fromDate)
      : true;

    const matchesToDate = localSearchQuery.toDate
      ? new Date(user.createdAt ?? "") <= new Date(localSearchQuery.toDate)
      : true;
    return matchesName && matchesEmail && matchesFromDate && matchesToDate;
  });

  const handleDeleteConfirm = async () => {
    if (selectedUserId !== null) {
      const result = await deleteUser(selectedUserId);
      setShowConfirmModal(false);
      setSelectedUserId(null);
      if (result.success) {
        toast.success(result.message || "User deleted successfully.");
      } else {
        toast.error(result.message || "Failed to delete user.");
      }
      fetchUsers({ page, limit });
    }
  };

  const showUserDetail = (userId: number) => {
    setSelectedUserId(userId);
    setShowDetailModal(true);
  };

  const selectedUser = users.find((user) => user.id === selectedUserId);

  return (
    <div className="max-w-7xl mx-auto text-brand-text">
      <h1 className="text-2xl font-bold mb-2 text-brand-heading">User List</h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-medium text-xs">Name:</span>
            <InputField
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="User name"
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="font-medium text-xs">Email:</span>
            <InputField
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="User email"
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="font-medium text-xs">From :</span>
            <InputField
              value={searchFromDate}
              onChange={(e) => setSearchFromDate(e.target.value)}
              type="date"
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="font-medium text-xs">To :</span>
            <InputField
              value={searchToDate}
              onChange={(e) => setSearchToDate(e.target.value)}
              type="date"
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Button variant="primary" className="px-4 py-2 text-sm">
              Search
            </Button>
          </div>
        </form>
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-brand-border bg-brand-card">
        <table className="min-w-full divide-y divide-brand-border">
          <thead className="bg-brand-code-bg">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-brand-heading uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-brand-heading uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-brand-heading uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-brand-heading uppercase tracking-wider">
                Date of Birth
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-brand-heading uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-brand-heading uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-brand-heading uppercase tracking-wider">
                Operations
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {filteredUsers.map((user) => (
              <tr
                onClick={() => {
                  showUserDetail(user.id);
                }}
                key={user.id}
                className="hover:cursor-pointer hover:bg-brand-accent-bg transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-heading">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">
                  {user.phone || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">
                  {user.dob ? new Date(user.dob).toLocaleDateString() : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-text truncate max-w-xs">
                  {user.address || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUserId(user.id);
                      setShowConfirmModal(true);
                    }}
                    variant="danger"
                    className="px-2 py-0.5 text-[10px] inline-flex items-center gap-1"
                  >
                    <Trash2 className="size-3" /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          page={page}
          total={total}
          totalPages={totalPages}
          limit={limit}
          setPage={setPage}
        />
        <ConfirmationModal
          isOpen={showConfirmModal}
          title="Delete User"
          message="Are you sure you want to delete this user? This action cannot be undone."
          confirmText="Delete"
          onClose={() => {
            setShowConfirmModal(false);
            setSelectedUserId(null);
          }}
          onConfirm={handleDeleteConfirm}
        />
        {showDetailModal && selectedUser && (
          <UserDetailModal
            user={selectedUser}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedUserId(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
