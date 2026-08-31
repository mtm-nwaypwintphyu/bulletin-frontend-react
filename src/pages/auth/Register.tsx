import FormLayout from "../../layouts/FormLayout";
import InputField from "../../components/ui/InputField";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Button from "../../components/ui/Button";
import { useAuthStore } from "../../stores/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { useState, type SubmitEvent } from "react";
import { toast } from "sonner";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    dob?: string;
    address?: string;
    phone?: string;
  }>({});

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = "Name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) newErrors.password = "Password is required";

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    const phoneRegex = /^[0-9]+$/;
    if (phone.trim() && !phoneRegex.test(phone.trim())) {
      newErrors.phone = "Phone number must contain only numbers";
    } else if (phone.trim() && phone.trim().length < 9) {
      newErrors.phone = "Phone number must be at least 9 digits";
    } else if (phone.trim() && phone.trim().length > 9) {
      newErrors.phone = "Phone number must be under 9 digits";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await register({
      name,
      email,
      password,
      phone,
      dob,
      address,
    });

    if (result.success) {
      toast.success("Registration successful!");
      navigate("/login");
    } else {
      toast.error(result.message || "Registration failed!");
    }
  };

  return (
    <FormLayout title="Register" description="Register to create an account.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <InputField
            label="Name"
            placeholder="Enter your name"
            value={name}
            type="email"
            className="w-full rounded-lg border border-brand-border px-3 py-2"
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "" }));
            }}
          />
          {errors.name && <ErrorMessage message={errors.name} />}
        </div>

        <div>
          <InputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            type="email"
            className="w-full rounded-lg border border-brand-border px-3 py-2"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
          />
          {errors.email && <ErrorMessage message={errors.email} />}
        </div>

        <div>
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            className="w-full rounded-lg border border-brand-border px-3 py-2"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
          />
          {errors.password && <ErrorMessage message={errors.password} />}
        </div>

        <div>
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            className="w-full rounded-lg border border-brand-border px-3 py-2"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors((prev) => ({ ...prev, confirmPassword: "" }));
            }}
          />
          {errors.confirmPassword && (
            <ErrorMessage message={errors.confirmPassword} />
          )}
        </div>

        <div>
          <InputField
            label="Date of Birth"
            type="date"
            value={dob}
            className="w-full rounded-lg border border-brand-border px-3 py-2"
            onChange={(e) => {
              setDob(e.target.value);
              setErrors((prev) => ({ ...prev, dob: "" }));
            }}
          />
          {errors.dob && <ErrorMessage message={errors.dob} />}
        </div>

        <div>
          <InputField
            label="Address"
            placeholder="Enter your address"
            value={address}
            className="w-full rounded-lg border border-brand-border px-3 py-2"
            onChange={(e) => {
              setAddress(e.target.value);
              setErrors((prev) => ({ ...prev, address: "" }));
            }}
          />
        </div>

        <div>
          <InputField
            label="Phone"
            placeholder="Enter your phone number"
            value={phone}
            className="w-full rounded-lg border border-brand-border px-3 py-2"
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors((prev) => ({ ...prev, phone: "" }));
            }}
          />
          {errors.phone && <ErrorMessage message={errors.phone} />}
        </div>

        <Button
          type="submit"
          className="w-full rounded-lg bg-brand-accent px-4 py-2.5 text-sm font-semibold text-brand-bg hover:opacity-90"
        >
          Register
        </Button>

        <p className="text-center text-xs">
          Already have an account?{" "}
          <Link
            to="/login"
            className="cursor-pointer text-brand-accent underline active:text-white"
          >
            Login now
          </Link>
        </p>
      </form>
    </FormLayout>
  );
}
