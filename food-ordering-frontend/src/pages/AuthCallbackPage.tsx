import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import * as authApi from "@/api/authApi";
import { Loader2 } from "lucide-react";

const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");
    const error = searchParams.get("error");
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const image = searchParams.get("image");

    if (error) {
      navigate("/sign-in?error=" + encodeURIComponent(error));
      return;
    }

    if (token && userId) {
      localStorage.setItem("session_id", token);
      localStorage.setItem("user_id", userId);
      if (email) localStorage.setItem("user_email", email);
      if (name) localStorage.setItem("user_name", name);
      if (image) localStorage.setItem("user_image", image);

      queryClient.invalidateQueries("validateToken");
      navigate("/");
      window.location.reload();
    } else {
      navigate("/sign-in");
    }
  }, [searchParams, navigate, queryClient]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
        <p className="text-gray-600">Completing sign-in...</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
