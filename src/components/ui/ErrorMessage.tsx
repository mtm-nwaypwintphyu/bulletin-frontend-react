import { ShieldCheck } from "lucide-react";
interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      className="mt-1 flex items-center gap-1 text-xs text-brand-red"
      role="alert"
    >
      <ShieldCheck className="h-4 my-2 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}
