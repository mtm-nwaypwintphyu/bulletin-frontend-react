import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User as UserIcon } from "lucide-react";
import { useUsers } from "../../hooks/useUsers";
import { useAuthStore } from "../../stores/useAuthStore";
import Button from "../../components/ui/Button";

export default function Profile() {
  const { currentUser } = useAuthStore();
  const { user, getUserById } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.id) {
      getUserById(currentUser.id);
    }
  }, [currentUser?.id, getUserById]);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto rounded-lg border border-brand-border bg-brand-card shadow-xl overflow-hidden text-brand-text">
      <div className="bg-brand-code-bg px-6 py-4 border-b border-brand-border">
        <h1 className="text-lg font-bold text-brand-heading">Profile</h1>
      </div>

      <div className="p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        <div className="flex flex-col items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-brand-accent-bg border border-brand-border flex items-center justify-center overflow-hidden">
            {user.profile ? (
              <img
                src={user.profile}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon className="size-16 text-brand-text/40" />
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4 text-sm w-full">
          <div className="grid grid-cols-2 gap-4 border-b border-brand-border pb-3">
            <span className="font-medium text-brand-heading">Name</span>
            <span className="text-brand-text/80">{user.name}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 border-b border-brand-border pb-3">
            <span className="font-medium text-brand-heading">Type</span>
            <span className="text-brand-text/80">{user.type || "N/A"}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 border-b border-brand-border pb-3">
            <span className="font-medium text-brand-heading">Email</span>
            <span className="text-brand-text/80 truncate">{user.email}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 border-b border-brand-border pb-3">
            <span className="font-medium text-brand-heading">Phone</span>
            <span className="text-brand-text/80">{user.phone || "N/A"}</span>
          </div>
          <div className="grid grid-cols-2 gap-4 border-b border-brand-border pb-3">
            <span className="font-medium text-brand-heading">
              Date of Birth
            </span>
            <span className="text-brand-text/80">
              {user.dob ? new Date(user.dob).toLocaleDateString() : "-"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 border-b border-brand-border pb-3">
            <span className="font-medium text-brand-heading">Address</span>
            <span className="text-brand-text/80 truncate">
              {user.address || "-"}
            </span>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              className="px-4 py-2 text-sm"
              onClick={() => navigate("/profile/edit")}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
