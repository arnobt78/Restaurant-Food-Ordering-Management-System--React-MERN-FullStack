import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";

const MainNav = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <span className="flex space-x-4 items-center">
      <Link to="/api-docs" className="font-bold hover:text-orange-500">
        API Docs
      </Link>
      <Link to="/api-status" className="font-bold hover:text-orange-500">
        API Status
      </Link>
      {isLoggedIn ? (
        <>
          <Link to="/business-insights" className="font-bold hover:text-orange-500">
            Business Insights
          </Link>
          <Link to="/optimization" className="font-bold hover:text-orange-500">
            Optimization
          </Link>
          <Link to="/order-status" className="font-bold hover:text-orange-500">
            Order Status
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <Link to="/sign-in">
          <Button
            variant="ghost"
            className="font-bold hover:text-orange-500 hover:bg-white border-2 border-orange-500"
          >
            Log In
          </Button>
        </Link>
      )}
    </span>
  );
};

export default MainNav;
