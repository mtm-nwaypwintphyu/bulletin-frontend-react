import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-bg px-4 text-center font-sans">
      <span className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
        404 error
      </span>

      <h1 className="mt-2 text-2xl font-bold text-brand-heading sm:text-3xl">
        Page not found
      </h1>

      <p className="mt-2 max-w-sm text-sm text-brand-text">
        Sorry, we couldn’t find the page you’re looking for. It might have been
        moved or deleted.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-accent-hover"
      >
        Back to home
      </Link>
    </div>
  );
}
