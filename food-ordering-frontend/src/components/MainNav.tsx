import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, FileText, Activity } from "lucide-react";

const NAV_AUTH_WIDTH = "min-w-[120px]";

const MainNav = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <nav className="flex items-center gap-4 lg:gap-6">
      {/* Nav links – always visible, no layout shift */}
      <Link
        to="/search/all"
        className="font-bold hover:text-orange-500 transition-colors"
      >
        Restaurants
      </Link>
      <Link
        to="/order-status"
        className="font-bold hover:text-orange-500 transition-colors"
      >
        Order Status
      </Link>
      <Link
        to="/business-insights"
        className="font-bold hover:text-orange-500 transition-colors"
      >
        Business Insights
      </Link>
      <Link
        to="/optimization"
        className="font-bold hover:text-orange-500 transition-colors"
      >
        Optimization
      </Link>

      {/* API dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="font-bold hover:text-orange-500 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded">
            API
            <ChevronDown className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link
              to="/api-docs"
              className="flex items-center gap-2 cursor-pointer"
            >
              <FileText className="h-4 w-4" />
              API Docs
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to="/api-status"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Activity className="h-4 w-4" />
              API Status
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Auth area – fixed width to prevent layout shift */}
      <div className={`flex items-center justify-end ${NAV_AUTH_WIDTH}`}>
        {isLoggedIn ? (
          <UsernameMenu />
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
      </div>
    </nav>
  );
};

export default MainNav;
