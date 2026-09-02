import { useState, useRef, useEffect } from "react";
import type { NavItem } from "../../types/common";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore";
import Button from "./Button";
import ThemeToggle from "./ThemeToggleButton";

interface NavbarProps {
  brandName?: string;
  items?: NavItem[];
  user?: {
    name: string;
    email: string;
    profile?: string | null;
    type?: string;
  } | null;
}

const defaultNavItems: NavItem[] = [
  { label: "Users", href: "/users" },
  { label: "Posts", href: "/posts" },
];

export default function Navbar({
  brandName = "Bulletin Board",
  items = defaultNavItems,
  user: propUser,
}: NavbarProps) {
  const storeUser = useAuthStore((state) => state.currentUser);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const user = propUser !== undefined ? propUser : storeUser;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-brand-border bg-brand-card/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/users"
          className="text-lg font-bold tracking-tight text-brand-heading hover:opacity-80 transition-opacity"
        >
          {brandName}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm font-medium text-brand-text/80 transition-colors hover:text-brand-heading"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />

          <Button
            onClick={() => navigate("/create-user")}
            variant="outline"
            className="text-xs py-1.5 px-3 h-8"
          >
            + Create User
          </Button>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2.5 rounded-full pl-2 pr-3 py-1.5 text-sm bg-brand-accent-bg/50 border border-brand-border hover:bg-brand-accent-bg transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                aria-expanded={isProfileOpen}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white uppercase shadow-sm">
                  {user.profile ? (
                    <img
                      src={user.profile}
                      alt={user.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                <span className="text-xs font-medium text-brand-heading max-w-[120px] truncate">
                  {user.name}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-brand-text/60 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-brand-border bg-brand-card p-1.5 shadow-xl backdrop-blur-md animate-in fade-in-50 zoom-in-95">
                  <div className="px-3 py-2.5 border-b border-brand-border">
                    <p className="text-xs font-semibold text-brand-heading">
                      {user.name}
                    </p>
                    <p className="text-xs text-brand-text/70 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-brand-text hover:bg-brand-accent-bg transition-colors"
                    >
                      Your Profile
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-brand-border">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-xs font-semibold px-4 py-2 rounded-md bg-brand-primary text-white hover:opacity-90 transition-opacity"
            >
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-brand-text hover:bg-brand-accent-bg hover:text-brand-heading focus:outline-none md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-b border-brand-border bg-brand-card px-4 pt-3 pb-5 space-y-3 md:hidden shadow-lg">
          <div className="pb-2">
            <ThemeToggle />
          </div>

          {user?.type === "ADMIN" && (
            <div className="pb-2">
              <Button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/create-user");
                }}
                variant="outline"
                className="w-full text-xs py-2"
              >
                + Create User
              </Button>
            </div>
          )}

          <div className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-brand-text hover:bg-brand-accent-bg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {user ? (
            <div className="pt-3 border-t border-brand-border space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 bg-brand-accent-bg/40 rounded-lg mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white uppercase">
                  {user.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-brand-heading truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-brand-text/70 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-xs font-medium text-brand-text hover:bg-brand-accent-bg"
              >
                Your Profile
              </Link>
              <button
                onClick={handleLogout}
                type="button"
                className="block w-full text-left rounded-md px-3 py-2 text-xs font-medium text-brand-red hover:bg-red-500/10"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-brand-border">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center rounded-md px-3 py-2 text-xs font-semibold bg-brand-primary text-white"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
