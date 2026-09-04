import { X } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmationModal({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="w-full max-w-md p-6 bg-brand-card border border-brand-border rounded-lg shadow-xl text-brand-text">
        <button
          onClick={onClose}
          className="w-full flex justify-end text-brand-text/60 hover:text-brand-text transition-colors"
        >
          <X className="size-5" />
        </button>
        <h2 className="text-lg font-bold text-brand-heading mb-2">{title}</h2>
        <p className="text-sm mb-6 text-brand-text/80">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium border border-brand-border rounded-md hover:cursor-pointer hover:bg-brand-accent-bg transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium bg-brand-red text-white rounded-md hover:cursor-pointer hover:bg-brand-red/80 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
