import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/Forgot";
import ResetPassword from "../pages/auth/Reset";
import NotFound from "../pages/common/NotFound";
import PostList from "../pages/posts/List";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" replace /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot", element: <ForgotPassword /> },
      { path: "/user/reset-password", element: <ResetPassword /> },
    ],
  },

  {
    element: (
      <ProtectedRoute>
        <ProtectedLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/posts",
        element: <PostList />,
      },
    ],
  },

  // not found pages
  {
    path: "*",
    element: <NotFound />,
  },
]);
