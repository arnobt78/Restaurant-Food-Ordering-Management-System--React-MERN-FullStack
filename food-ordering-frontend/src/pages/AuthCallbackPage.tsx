import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const { createUser } = useCreateMyUser();

  const hasCreatedUser = useRef(false);
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (isAuthenticated && user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
  }, [createUser, isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && !hasNavigated.current) {
      // Auth0ProviderWithNavigate's onRedirectCallback should handle the returnTo
      // But if we end up here, navigate to home as fallback
      // The returnTo should have been handled by onRedirectCallback
      hasNavigated.current = true;
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
