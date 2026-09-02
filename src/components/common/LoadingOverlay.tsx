import React from "react";
import { Loader2 } from "lucide-react";

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
        <Loader2 className="animate-spin h-5 w-5 text-brand-accent" />

        <p className="text-brand-heading text-sm font-semibold font-sans tracking-wide">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
