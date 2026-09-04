import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export default function Input({
  label,
  error,
  type = "text",
  className = "",
  id,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || props.name;

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-brand-heading"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          {...props}
          id={inputId}
          type={inputType}
          className={`w-full rounded-lg border bg-brand-card px-4 py-2.5 text-sm text-brand-heading transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 ${
            isPassword ? "pr-11" : ""
          } ${
            error
              ? "border-brand-red focus:ring-brand-red/20"
              : "border-brand-border focus:border-brand-accent focus:ring-brand-accent/20"
          } ${className}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-brand-text transition-colors hover:text-brand-accent focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {error && <p className="text-xs text-brand-red">{error}</p>}
    </div>
  );
}
