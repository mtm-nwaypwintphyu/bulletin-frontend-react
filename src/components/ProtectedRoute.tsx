import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import LoadingOverlay from "./common/LoadingOverlay";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const initialized = useAuthStore((state) => state.initialized);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!initialized || loading) {
    return (
      <LoadingOverlay
        isLoading={true}
        message="Getting things ready for you..."
      />
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children || <Outlet />}</>;
}
