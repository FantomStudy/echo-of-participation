import { Navigate } from "react-router-dom";

import ProtectedRoute from "@components/ProtectedRoute/ProtectedRoute";
import Login from "@features/auth/pages/Login";
import Dashboard from "@features/dashboard/pages/Dashboard";
import EventEvaluation from "@features/eventsEvaluation/pages/EventEvaluation";
import NotFound from "@features/notFound/pages/NotFound";
import AddUserPage from "@features/profiles/admin/pages/AddUserPage";
import AdminProfilePage from "@features/profiles/admin/pages/AdminProfilePage";
import StudentProfilePage from "@features/profiles/student/pages/StudentProfilePage";
import UserProfile from "@features/profiles/user/pages/UserProfile";

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
    path: "/event-evaluation",
    element: (
      <ProtectedRoute>
        <EventEvaluation />
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
    path: "/user/profile/:userId",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="Администратор">
        <AdminProfilePage />
      </ProtectedRoute>
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
