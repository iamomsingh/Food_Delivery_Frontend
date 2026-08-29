import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function RoleRoute({ allowedRoles }) {
  const { user } = useSelector((state) => state.auth);

  const userRoles = user?.roles || [];

  const hasRole = allowedRoles.some((role) => userRoles.includes(role));

  if (!hasRole) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}

export default RoleRoute;
