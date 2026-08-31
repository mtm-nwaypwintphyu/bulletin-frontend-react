import FormLayout from "../../layouts/FormLayout";
import InputField from "../../components/ui/InputField";
import { useState, type SubmitEvent } from "react";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { useAuthStore } from "../../stores/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { forgot } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setError("Email is required");
      return;
    } else if (!emailRegex.test(email.trim())) {
      setError("Invalid email format");
      return;
    }

    const result = await forgot(email);
    if (result.success) {
      toast.success("Password reset email was sent successfully");
      navigate("/login");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <FormLayout
      title="Forgot password"
      description="Enter your email address you'd like your password reset information sent to."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <InputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            className="w-full rounded-lg border border-brand-border px-3 py-2"
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
          {error && <ErrorMessage message={error} />}
        </div>

        <Button
          type="submit"
          className="my-3 w-full rounded-lg bg-brand-accent px-4 py-2.5 text-sm font-semibold text-brand-bg hover:opacity-90"
        >
          Request reset link
        </Button>
        <p className="text-sm text-brand-accent text-center mt-2">
          Return to &nbsp;
          <Link
            to="/login"
            className=" underline cursor-pointer active:text-white"
          >
            Login
          </Link>
        </p>
      </form>
    </FormLayout>
  );
}
