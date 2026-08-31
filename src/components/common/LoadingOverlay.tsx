import React from "react";

interface LoadingProps {
  isLoading: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingProps> = ({
  isLoading,
  message = "Loading...",
}) => {
  if (!isLoading) return null;

  return (
    <div
      id="loading-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-bg/80 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 rounded-xl px-5 py-3.5">
        <svg
          className="animate-spin h-5 w-5 text-brand-accent"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25 stroke-brand-border"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>

          <path
            className="opacity-100 fill-brand-accent"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>

        <p className="text-brand-heading text-sm font-semibold font-sans tracking-wide">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
