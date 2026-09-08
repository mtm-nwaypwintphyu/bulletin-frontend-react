import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import ForgotPassword from "../pages/auth/Forgot";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/Reset";
import NotFound from "../pages/common/NotFound";
import UserList from "../pages/users/List";
import Profile from "../pages/auth/Profile";
import EditProfile from "../pages/users/EditProfile";
import ChangePassword from "../pages/users/ChangePassword";
import CreateUser from "../pages/users/CreateUser";
import CreateUserConfirm from "../pages/users/CreateUserConfirm";
import PostList from "../pages/posts/List";
import CreatePost from "../pages/posts/CreatePost";
import Error from "../pages/common/Error";
import CreatePostConfirm from "../pages/posts/CreatePostConfirm";
import EditPage from "../pages/posts/[id]/EditPage";
import EditConfirmPage from "../pages/posts/[id]/EditConfirmPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <Error />,
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
    errorElement: <Error />,
    children: [
      {
        path: "/users",
        element: <UserList />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile/edit",
        element: <EditProfile />,
      },
      {
        path: "/profile/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/users/create",
        element: <CreateUser />,
      },
      {
        path: "/users/create/confirm",
        element: <CreateUserConfirm />,
      },
      {
        path: "/posts",
        element: <PostList />,
      },
      {
        path: "/posts/create",
        element: <CreatePost />,
      },
      {
        path: "/posts/create/confirm",
        element: <CreatePostConfirm />,
      },
      {
        path: "/posts/:id/edit",
        element: <EditPage />,
      },
      {
        path: "/posts/:id/edit/confirm",
        element: <EditConfirmPage />,
      },
    ],
  },

  // not found pages
  {
    path: "*",
    element: <NotFound />,
  },
]);
