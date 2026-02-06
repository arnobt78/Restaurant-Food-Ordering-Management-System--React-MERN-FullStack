import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import * as authApi from "@/api/authApi";
import { useQueryClient } from "react-query";

const MobileNavLinks = () => {
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("cartItems-")) sessionStorage.removeItem(key);
    });
    await authApi.signOut();
    queryClient.invalidateQueries("validateToken");
    window.location.href = "/";
  };
  return (
    <>
      <Link
        to="/api-docs"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        API Docs
      </Link>
      <Link
        to="/api-status"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        API Status
      </Link>
      <Link
        to="/business-insights"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Business Insights
      </Link>
      <Link
        to="/optimization"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Optimization
      </Link>
      <Link
        to="/order-status"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Order Status
      </Link>
      <Link
        to="/manage-restaurant"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        My Restaurant
      </Link>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        User Profile
      </Link>
      <Button
        onClick={handleLogout}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
