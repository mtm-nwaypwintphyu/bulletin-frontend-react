import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  let message: string;
  if (isRouteErrorResponse(error)) {
    message = error.statusText;
  } else if (error instanceof Error) {
    message = (error as Error).message;
  } else {
    message = "An unexpected error occurred. Please try again or return to safety.";
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-bg px-4 text-center font-sans">
      <span className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
        System Error
      </span>

      <h1 className="mt-2 text-2xl font-bold text-brand-heading sm:text-3xl">
        Something went wrong
      </h1>

      <p className="mt-2 max-w-sm text-sm text-brand-text">
        {message}
      </p>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg border border-brand-border bg-brand-card px-4 py-2 text-sm font-medium text-brand-heading transition-colors hover:bg-brand-accent-bg"
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
