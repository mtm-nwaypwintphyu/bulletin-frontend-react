import { useState, type SubmitEvent } from "react";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Checkbox from "../../components/ui/CheckBox";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import FormLayout from "../../layouts/FormLayout";

export default function Login() {
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await login({ email, password, rememberMe: check });
    if (result.success) {
      toast.success("Login successful!");
      navigate("/posts");
    } else {
      toast.error(result.message);
    }
  };
  return (
    <FormLayout title="Login" description="Login to manage your dashboard.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Email"
          placeholder="Enter your email"
          value={email}
          className="w-full rounded-lg border border-brand-border px-3 py-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <ErrorMessage message={errors.email} />}

        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          className="w-full rounded-lg border border-brand-border px-3 py-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <ErrorMessage message={errors.password} />}

        <Checkbox
          checked={check}
          onChange={() => setCheck(!check)}
          label="Remember Me"
        />

        <Button
          type="submit"
          className="mt-1 w-full rounded-lg bg-brand-accent px-4 py-2.5 text-sm font-semibold text-brand-bg hover:opacity-90"
        >
          Login
        </Button>
        <div className="flex flex-row items-center justify-between mt-1 w-full text-xs">
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-brand-accent underline cursor-pointer active:text-white"
            >
              Sign up now
            </Link>
          </p>
          <p>
            <Link
              to="/forgot"
              className="text-brand-accent underline cursor-pointer active:text-white"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </form>
    </FormLayout>
  );
}
