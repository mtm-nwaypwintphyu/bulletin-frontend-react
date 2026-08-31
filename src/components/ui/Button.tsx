import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-lg px-6 py-2.5 font-sans text-sm font-semibold transition-all active:scale-95 disabled:opacity-50 ${
        isPrimary
          ? "bg-brand-accent text-brand-heading hover:bg-brand-accent-hover"
          : "border border-brand-border bg-brand-card text-brand-heading hover:bg-brand-accent-bg hover:border-brand-accent-border"
      } ${className}`}
    >
      <span className="flex items-center gap-2">{children}</span>
    </button>
  );
}
