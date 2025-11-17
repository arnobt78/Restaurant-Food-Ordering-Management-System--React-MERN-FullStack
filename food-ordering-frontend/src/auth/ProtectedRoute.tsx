import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Only redirect once, and wait for Auth0 to finish loading
    if (!isLoading && !isAuthenticated && !hasRedirected.current) {
      hasRedirected.current = true;
      // Use Auth0's loginWithRedirect to preserve the return URL
      loginWithRedirect({
        appState: {
          returnTo: location.pathname + location.search,
        },
      });
    }
  }, [isLoading, isAuthenticated, loginWithRedirect, location]);

  // Reset redirect flag if user becomes authenticated
  useEffect(() => {
    if (isAuthenticated) {
      hasRedirected.current = false;
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  // Show loading while redirecting to login
  return null;
};

export default ProtectedRoute;
