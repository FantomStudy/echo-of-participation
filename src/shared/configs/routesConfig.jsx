import { Navigate } from "react-router-dom";
import Login from "@auth/pages/Login";
import AddUserPage from "@features/profiles/admin/pages/AddUserPage";
import AdminProfilePage from "@features/profiles/admin/pages/AdminProfilePage";
import StudentProfilePage from "@features/profiles/student/pages/StudentProfilePage";
import ProtectedRoute from "@components/ProtectedRoute/ProtectedRoute";
import Dashboard from "@features/dashboard/pages/Dashboard";
import NotFound from "@features/notFound/pages/NotFound";

export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/not-found",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/not-found" replace />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
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
      // <ProtectedRoute requiredRole="Администратор">
      <AdminProfilePage />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/admin/add-user",
    element: (
      <ProtectedRoute requiredRole="Администратор">
        <AddUserPage />
      </ProtectedRoute>
    ),
  },
];
