import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-card border-t border-brand-border text-brand-text py-4 px-6 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          &copy; {new Date().getFullYear()} User Management System. All rights
          reserved.
        </p>
        <div className="flex gap-4 text-brand-heading">
          <Link to="#" className="hover:underline transition-colors">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:underline transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
