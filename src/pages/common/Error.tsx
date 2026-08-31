import { useRouteError, Link } from "react-router-dom";

export default function Error() {
  const error = useRouteError() as any;

  console.error("Application Error:", error);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-bg px-4 text-center font-sans">
      <span className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
        System Error
      </span>

      <h1 className="mt-2 text-2xl font-bold text-brand-heading sm:text-3xl">
        Something went wrong
      </h1>

      <p className="mt-2 max-w-sm text-sm text-brand-text">
        {error?.statusText ||
          error?.message ||
          "An unexpected error occurred. Please try again or return to safety."}
      </p>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg border border-brand-border bg-white px-4 py-2 text-sm font-medium text-brand-heading transition-colors hover:bg-gray-50"
        >
          Reload page
        </button>

        <Link
          to="/"
          className="rounded-lg bg-brand-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-accent-hover"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
