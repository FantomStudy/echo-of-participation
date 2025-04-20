import Login from "@features/auth/pages/Login";
import NoAccessPage from "@features/noAccess/pages/NoAccessPage";
import AddUserPage from "@features/profile/admin/pages/AddUserPage";
import AdminProfilePage from "@features/profile/admin/pages/AdminProfilePage";
import StudentProfilePage from "@features/profile/student/pages/StudentProfilePage";
import ProtectedRoute from "@components/ProtectedRoute/ProtectedRoute";
import Dashboard from "@features/dashboard/pages/Dashboard";

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
    path: "/no-access",
    element: <NoAccessPage />,
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
