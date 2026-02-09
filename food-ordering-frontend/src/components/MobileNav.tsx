import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger aria-label="Open menu">
        <Menu className="h-6 w-6 text-orange-500" />
      </SheetTrigger>
      <SheetContent className="flex flex-col" side="right">
        <SheetTitle className="text-left">Menu</SheetTitle>
        <Separator />
        <SheetDescription className="flex-1 pt-4 flex flex-col">
          <MobileNavLinks />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
