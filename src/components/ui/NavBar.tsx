import { useState } from "react";
import type { NavItem } from "../types/common";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

interface NavbarProps {
  brandName?: string;
  items?: NavItem[];
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  } | null;
}

const defaultNavItems: NavItem[] = [
  { label: "Users", href: "/users" },
  { label: "Posts", href: "/posts" },
];

export default function Navbar({
  brandName = "BrandLogo",
  items = defaultNavItems,
  user: propUser,
}: NavbarProps) {
  const storeUser = useAuthStore((state) => state.user);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const user = propUser !== undefined ? propUser : storeUser;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-brand-border bg-brand-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-brand-heading"
        >
          {brandName}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-brand-text transition-colors hover:text-brand-accent"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="relative hidden items-center md:flex">
          {user ? (
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 rounded-full p-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
              aria-expanded={isProfileOpen}
            >
              <span className="text-sm font-medium text-brand-heading">
                {user.name}
              </span>
            </button>
          ) : (
            <a
              href="/login"
              className="text-sm font-medium text-brand-accent hover:underline"
            >
              Login
            </a>
          )}

          {isProfileOpen && user && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-brand-border bg-brand-card p-1 shadow-lg backdrop-blur-md">
              <div className="px-3 py-2 border-b border-brand-border">
                <p className="text-xs font-medium text-brand-heading">
                  {user.name}
                </p>
                <p className="text-xs text-brand-text truncate">{user.email}</p>
              </div>
              <a
                href="#profile"
                className="block rounded-md px-3 py-2 text-sm text-brand-text hover:bg-brand-bg hover:text-brand-accent"
              >
                Your Profile
              </a>
              <a
                href="#settings"
                className="block rounded-md px-3 py-2 text-sm text-brand-text hover:bg-brand-bg hover:text-brand-accent"
              >
                Settings
              </a>
              <button
                type="button"
                onClick={handleLogout}
                className="block w-full rounded-md px-3 py-2 text-left text-sm text-red-400 hover:bg-brand-bg"
              >
                Sign out
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-brand-text hover:bg-brand-card hover:text-brand-heading focus:outline-none md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="border-b border-brand-border bg-brand-card px-4 pt-2 pb-4 space-y-3 md:hidden">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-brand-text hover:bg-brand-bg hover:text-brand-accent"
            >
              {item.label}
            </a>
          ))}

          {user && (
            <div className="pt-3 border-t border-brand-border space-y-1">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-brand-bg">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-heading">
                    {user.name}
                  </p>
                  <p className="text-xs text-brand-text">{user.email}</p>
                </div>
              </div>
              <a
                href="#profile"
                className="block rounded-md px-3 py-2 text-base font-medium text-brand-text hover:bg-brand-bg"
              >
                Your Profile
              </a>
              <a
                href="#settings"
                className="block rounded-md px-3 py-2 text-base font-medium text-brand-text hover:bg-brand-bg"
              >
                Settings
              </a>
              <button
                onClick={handleLogout}
                type="button"
                className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-red-400 hover:bg-brand-bg"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
