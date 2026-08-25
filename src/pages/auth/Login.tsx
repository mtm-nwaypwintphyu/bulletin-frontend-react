import { useState, type SubmitEvent } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const result = await login({ email, password, rememberMe });
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ui-bg px-4 antialiased transition-colors duration-300">
      <div className="w-full max-w-md rounded-2xl border border-ui-border bg-ui-card p-10 shadow-xl transition-all duration-300">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ui-text">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to manage your dashboard
          </p>
        </div>

        {error && (
          <div className="mb-6 border-l-4 border-red-500 bg-red-50 dark:bg-red-950/50 p-4 text-sm text-red-700 dark:text-red-400 rounded-r-md">
            <div className="flex items-center">
              <svg
                className="mr-2 h-4 w-4 shrink-0 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-ui-border bg-ui-input px-3.5 py-2.5 text-sm text-ui-text placeholder-slate-400 transition duration-200 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-ring"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-ui-border bg-ui-input pl-3.5 pr-11 py-2.5 text-sm text-ui-text placeholder-slate-400 transition duration-200 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-ring"
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 flex items-center justify-center text-slate-400 hover:text-brand-primary focus:outline-none cursor-pointer transition-colors duration-200"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://w3.org"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://w3.org"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary accent-brand-primary"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm font-medium text-slate-600 cursor-pointer select-none"
              >
                Keep me signed in
              </label>
            </div>

            <a
              href="#forgot"
              className="text-sm font-semibold text-brand-primary hover:text-brand-hover transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center rounded-lg bg-brand-primary py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-brand-hover hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-brand-ring disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {loading ? "Verifying credentials..." : "Sign In to Account"}
          </button>

          <div className="mt-6 text-center pt-4 border-t border-ui-border">
            <p className="text-xs font-semibold tracking-wide text-slate-500">
              New to the platform?{" "}
              <Link
                to="/register"
                className="ml-1 font-bold text-brand-primary hover:text-brand-hover transition-colors duration-200 hover:underline underline-offset-4"
              >
                Create an Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
