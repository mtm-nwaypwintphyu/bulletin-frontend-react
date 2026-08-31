import { useState, type SubmitEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FormLayout from "../../layouts/FormLayout";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { toast } from "sonner";
import { authApi } from "../../api/auth";
import axios from "axios";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await authApi.reset(token, password);

      toast.success(response.data.message || "Password reset successfully!");
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to reset password.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      title="Reset Password"
      description="Enter your new password below."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <InputField
            label="New Password"
            type="password"
            placeholder="Enter new password"
            value={password}
            className="w-full rounded-lg border border-brand-border px-3 py-2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            className="w-full rounded-lg border border-brand-border px-3 py-2"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <ErrorMessage message={error} />}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand-accent px-4 py-2.5 text-sm font-semibold text-brand-bg hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </FormLayout>
  );
}
