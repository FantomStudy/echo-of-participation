import Login from "@features/auth/pages/Login";
import NotFoundPage from "@/features/noAccess/pages/NotFoundPage";
import AddUserPage from "@features/profiles/admin/pages/AddUserPage";
import AdminProfilePage from "@features/profiles/admin/pages/AdminProfilePage";
import StudentProfilePage from "@features/profiles/student/pages/StudentProfilePage";
import ProtectedRoute from "@components/ProtectedRoute/ProtectedRoute";
import Dashboard from "@features/dashboard/pages/Dashboard";
import { Navigate } from "react-router-dom";

export const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/not-found",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <Navigate to="/not-found" replace />,
  },
  {
    path: "/student/profile/:studentId",
    element: (
      <ProtectedRoute>
        <StudentProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/add-user",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AddUserPage />
      </ProtectedRoute>
    ),
  },
];
