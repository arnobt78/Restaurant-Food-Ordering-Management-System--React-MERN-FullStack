import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  // Preserve the current location so user can be redirected back after login
  return (
    <Navigate
      to="/"
      state={{ returnTo: location.pathname + location.search }}
      replace
    />
  );
};

export default ProtectedRoute;
