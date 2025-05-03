import { Navigate, useLocation } from "react-router-dom";
import { queryClient } from "@configs/queryClientConfig";
import { useCheckAuth } from "@stores/authStore";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const location = useLocation();
  const isAuth = useCheckAuth();

  const user = queryClient.getQueryData(["currentUser"]);
  const roleName = user?.roleName;

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && roleName !== requiredRole) {
    return <Navigate to="/not-found" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
