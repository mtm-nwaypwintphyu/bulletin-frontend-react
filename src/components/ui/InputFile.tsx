interface InputFileProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export default function InputFile({
  label,
  error,
  className = "",
  id,
  ...props
}: InputFileProps) {
  const inputId = id || props.name;

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
      <div className="flex items-center gap-3">
        <label
          htmlFor={inputId}
          className={`cursor-pointer rounded-lg border border-brand-border bg-brand-card px-4 py-2.5 text-sm font-medium text-brand-heading transition-all hover:bg-brand-accent-bg hover:border-brand-accent-border active:scale-95 ${className}`}
        >
          Choose File
        </label>
        <input {...props} id={inputId} type="file" className="hidden" />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
}
