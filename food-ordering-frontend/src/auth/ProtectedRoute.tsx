import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign-in", { state: { from: location } });
    }
  }, [isLoggedIn, navigate, location]);

  if (!isLoggedIn) return null;
  return <Outlet />;
};

export default ProtectedRoute;
