import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
  const { isLoggedIn } = useAppContext();
  const email = localStorage.getItem("user_email");

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isLoggedIn ? (
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-orange-500" />
              {email}
            </span>
          ) : (
            <span>Welcome to BigHungers.com!</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isLoggedIn ? (
            <MobileNavLinks />
          ) : (
            <Link to="/sign-in">
              <Button className="flex-1 font-bold bg-orange-500 w-full">
                Log In
              </Button>
            </Link>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
