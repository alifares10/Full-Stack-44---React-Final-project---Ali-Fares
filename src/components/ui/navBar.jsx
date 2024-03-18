import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { signOut } from "firebase/auth";
import { Button } from "./Button";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const NavBar = (className) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleSignOut = () => {
    try {
      signOut(auth);
      dispatch({ type: "LOGOUT" });
      toast.success("Signed out");
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <nav
      className={cn(
        "flex items-center space-x-4 lg:space-x-6 border-b-2 justify-around p-3 px-6 bg-gray-300 dark:bg-gray-900 w-full",
        className
      )}
    >
      <img src="/src/assets/react.svg" alt="" />
      <div className="flex items-center space-x-4 lg:space-x-6 justify-center ">
        <Link
          className={`text-sm font-medium transition-colors dark:hover:text-muted-foreground hover:text-primary ${
            pathname === "/products" ? "text-muted-foreground" : ""
          }`}
          to="/products"
        >
          Products
        </Link>
        <Link
          className={`text-sm font-medium transition-colors dark:hover:text-muted-foreground hover:text-primary ${
            pathname === "/customers" ? "text-muted-foreground" : ""
          }`}
          to="/customers"
        >
          Customers
        </Link>
        <Link
          className={`text-sm font-medium transition-colors dark:hover:text-muted-foreground hover:text-primary ${
            pathname === "/purchases" ? "text-muted-foreground" : ""
          }`}
          to="/purchases"
        >
          Purchases
        </Link>
      </div>
      <div className="flex items-center ">
        {user.isAuth ? (
          <div className="flex mx-3 space-x-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button onClick={handleSignOut}>Sign Out</Button>
          </div>
        ) : (
          <Button>
            <Link to="/signIn">Sign In</Link>
          </Button>
        )}

        <ModeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
