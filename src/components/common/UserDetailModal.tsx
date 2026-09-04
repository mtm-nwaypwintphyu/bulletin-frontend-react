import type { User } from "../../types/api";
import { User as UserIcon, X } from "lucide-react";

interface UserDetailModalProps {
  user: User;
  onClose: () => void;
}

export default function UserDetailModal({
  user,
  onClose,
}: UserDetailModalProps) {
  if (!user) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl p-6 bg-brand-card border border-brand-border rounded-lg shadow-xl text-brand-text max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-3 border-b border-brand-border mb-6">
          <h2 className="text-lg font-bold text-brand-heading">User Detail</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-brand-text/60 hover:text-brand-text transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <div className="flex flex-col items-center justify-center sm:w-1/3">
            <div className="w-28 h-28 rounded-full bg-brand-accent-bg border border-brand-border flex items-center justify-center overflow-hidden mb-2">
              {user.profile ? (
                <img
                  src={user.profile}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon className="size-14 text-brand-text/40" />
              )}
            </div>
          </div>

          <div className="flex-1 space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4 border-b border-brand-border pb-2">
              <span className="font-medium text-brand-heading">Name</span>
              <span className="text-brand-text/80">{user.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b border-brand-border pb-2">
              <span className="font-medium text-brand-heading">Type</span>
              <span className="text-brand-text/80">{user.type || "-"}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b border-brand-border pb-2">
              <span className="font-medium text-brand-heading">Email</span>
              <span className="text-brand-text/80 truncate">{user.email}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b border-brand-border pb-2">
              <span className="font-medium text-brand-heading">Phone</span>
              <span className="text-brand-text/80">{user.phone || "-"}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b border-brand-border pb-2">
              <span className="font-medium text-brand-heading">
                Date of Birth
              </span>
              <span className="text-brand-text/80">
                {user.dob ? new Date(user.dob).toLocaleDateString() : "-"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b border-brand-border pb-2">
              <span className="font-medium text-brand-heading">Address</span>
              <span className="text-brand-text/80 truncate">
                {user.address || "-"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b border-brand-border pb-2">
              <span className="font-medium text-brand-heading">
                Created Date
              </span>
              <span className="text-brand-text/80">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "-"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-b border-brand-border pb-2">
              <span className="font-medium text-brand-heading">
                Updated Date
              </span>
              <span className="text-brand-text/80">
                {user.updatedAt
                  ? new Date(user.updatedAt).toLocaleDateString()
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-brand-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium border border-brand-border rounded-md hover:cursor-pointer hover:bg-brand-accent-bg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
