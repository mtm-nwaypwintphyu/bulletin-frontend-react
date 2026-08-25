import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute() {
  const { user, checkAuth } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAuth().finally(() => setChecking(false));
  }, [checkAuth]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ui-bg transition-colors duration-300">
        <h3 className="text-lg font-medium text-ui-text animate-pulse">
          Verifying secure session...
        </h3>
      </div>
    );
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
