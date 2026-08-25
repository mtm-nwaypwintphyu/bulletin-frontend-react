import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <BrowserRouter>
      <button
        type="button"
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-ui-border bg-ui-card text-ui-text shadow-md hover:scale-105 transition-all duration-200 cursor-pointer focus:outline-none"
        title="Toggle Visual Theme Mode"
      >
        {isDark ? (
          <svg
            xmlns="http://w3.org"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-amber-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m0 13.5V21M4.22 4.22l1.58 1.58m12.42 12.42l1.58 1.58M3 12h2.25m13.5 0H21m-2.25-7.78l-1.58 1.58M6.06 17.94l-1.58 1.58M12 6.75a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://w3.org"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-slate-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        )}
      </button>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-ui-bg text-ui-text p-8 transition-colors duration-300">
                <div className="max-w-4xl mx-auto rounded-xl border border-ui-border bg-ui-card p-6 shadow-sm">
                  <h1 className="text-2xl font-bold">
                    Welcome to the Store Feed!
                  </h1>
                  <p className="mt-2 text-slate-500 dark:text-slate-400">
                    You have successfully authenticated.
                  </p>
                </div>
              </div>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
