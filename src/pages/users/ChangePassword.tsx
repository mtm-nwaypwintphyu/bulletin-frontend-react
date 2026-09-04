import { useState, type SubmitEvent } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../stores/useAuthStore";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";

export default function ChangePassword() {
  const { changePassword } = useAuthStore();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState<{
    password?: string;
    newPassword?: string;
  }>({});

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const newErrors: { password?: string; newPassword?: string } = {};

    if (!password.trim()) {
      newErrors.password = "Old password is required";
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "New password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await changePassword(password, newPassword);

    if (result?.success) {
      toast.success("Password changed successfully!");
      navigate("/profile");
    } else {
      toast.error(result?.message || "Failed to change password.");
    }
  };

  const handleClear = () => {
    setPassword("");
    setNewPassword("");
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto rounded-lg border border-brand-border bg-brand-card shadow-xl overflow-hidden text-brand-text">
      <div className="bg-brand-code-bg px-6 py-4 border-b border-brand-border">
        <h1 className="text-lg font-bold text-brand-heading">
          Change Password
        </h1>
      </div>

      <form className="p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="flex w-full justify-center flex-col sm:flex-row sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">
            Current Password:
          </span>
          <div className="w-full sm:w-1/2">
            <InputField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter old password"
            />
            {errors.password && <ErrorMessage message={errors.password} />}
          </div>
        </div>

        <div className="flex my-5 flex-col justify-center sm:flex-row sm:items-center gap-2">
          <span className="font-medium text-xs mr-5 w-28">New Password:</span>
          <div className="w-full sm:w-1/2">
            <InputField
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <ErrorMessage message={errors.newPassword} />
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-brand-border">
          <Button variant="primary" type="submit" className="px-4 py-2 text-sm">
            Change Password
          </Button>
          <Button variant="outline" type="button" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}
