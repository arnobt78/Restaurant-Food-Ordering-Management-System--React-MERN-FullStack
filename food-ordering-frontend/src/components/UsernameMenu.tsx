import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useState } from "react";
import * as authApi from "@/api/authApi";
import { useQueryClient } from "react-query";

const getAvatarUrl = () => {
  const image = localStorage.getItem("user_image");
  const email = localStorage.getItem("user_email");
  const name = localStorage.getItem("user_name");
  const id = email || name || "user";
  if (image) return image;
  return `https://robohash.org/${id}.png?set=set1&size=80x80`;
};

const UsernameMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const queryClient = useQueryClient();

  const email = localStorage.getItem("user_email");
  const name = localStorage.getItem("user_name");

  const avatarUrl = imgError
    ? `https://robohash.org/${email || "user"}.png?set=set1&size=80x80`
    : getAvatarUrl();

  const handleMenuClick = () => setIsOpen(false);

  const handleLogout = async () => {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith("cartItems-")) sessionStorage.removeItem(key);
    });
    await authApi.signOut();
    queryClient.invalidateQueries("validateToken");
    setIsOpen(false);
    window.location.href = "/";
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full border-2 border-teal-500 p-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500">
          <img
            src={avatarUrl}
            alt={name || email || "User"}
            className="h-9 w-9 rounded-full object-cover"
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-2">
          <p className="font-medium">{name || "User"}</p>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
        <Separator />
        <DropdownMenuItem onClick={handleMenuClick}>
          <Link to="/manage-restaurant" className="font-bold hover:text-orange-500">
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleMenuClick}>
          <Link to="/user-profile" className="font-bold hover:text-orange-500">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button onClick={handleLogout} className="w-full font-bold bg-orange-500">
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
