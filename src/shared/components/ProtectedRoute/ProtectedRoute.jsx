import { Navigate, useLocation } from "react-router-dom";
import { queryClient } from "@configs/queryClientConfig";
import { useCheckAuth } from "@shared/stores/localStore";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const userData = queryClient.getQueryData(["user"]);
  const roleName = userData?.roleName;
  const checkAuth = useCheckAuth();

  const location = useLocation();

  if (!checkAuth) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && roleName !== requiredRole) {
    return <Navigate to="/no-access" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
