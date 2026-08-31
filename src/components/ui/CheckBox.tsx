import React from "react";

interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: React.ReactNode;
  error?: string;
  className?: string;
}

export default function Checkbox({
  label,
  error,
  className = "",
  id,
  disabled,
  ...props
}: CheckboxProps) {
  const checkboxId = id || props.name;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label
        htmlFor={checkboxId}
        className={`inline-flex items-center gap-2.5 select-none ${
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
      >
        <div className="relative flex items-center justify-center">
          <input
            {...props}
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            className="peer h-5 w-5 appearance-none rounded border border-brand-border bg-brand-card transition-all checked:border-brand-accent checked:bg-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20 disabled:cursor-not-allowed"
          />
          <svg
            className="pointer-events-none absolute h-3.5 w-3.5 text-brand-bg opacity-0 transition-opacity peer-checked:opacity-100"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {label && (
          <span className="text-sm font-medium text-brand-heading">
            {label}
          </span>
        )}
      </label>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
