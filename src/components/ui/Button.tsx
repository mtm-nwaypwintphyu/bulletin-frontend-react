import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "danger";
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-brand-accent text-brand-heading hover:bg-brand-accent-hover",
    outline:
      "border border-brand-border bg-brand-card text-brand-heading hover:bg-brand-accent-bg hover:border-brand-accent-border",
    danger: "bg-brand-red text-white hover:opacity-90",
  };

  return (
    <button
      {...props}
      className={`hover:cursor-pointer inline-flex items-center justify-center rounded-lg px-6 py-2.5 font-sans text-sm font-semibold transition-all active:scale-95 disabled:opacity-50 ${variantClasses[variant]} ${className}`}
    >
      <span className="flex items-center gap-2">{children}</span>
    </button>
  );
}
