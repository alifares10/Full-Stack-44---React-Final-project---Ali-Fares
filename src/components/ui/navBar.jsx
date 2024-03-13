import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { signOut } from "firebase/auth";
import { Button } from "./Button";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

const NavBar = (className) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
        "flex items-center space-x-4 lg:space-x-6 border-b-2 w-screen justify-between p-3 px-6 bg-gray-300 dark:bg-gray-900",
        className
      )}
    >
      <img src="/src/assets/react.svg" alt="" />
      <div className="flex items-center space-x-4 lg:space-x-6 justify-center">
        <Link
          className="text-sm font-medium transition-colors dark:hover:text-primary hover:text-gray-500"
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium text-muted-foreground transition-colors dark:hover:text-primary hover:text-gray-800"
          to="/products"
        >
          Products
        </Link>
        <Link
          className="text-sm font-medium text-muted-foreground transition-colors dark:hover:text-primary hover:text-gray-800"
          to="/customers"
        >
          Customers
        </Link>
        <Link
          className="text-sm font-medium text-muted-foreground transition-colors dark:hover:text-primary hover:text-gray-800"
          to="/purchases"
        >
          Purchases
        </Link>
      </div>
      <div className="flex items-center ">
        <Link
          to="/signIn"
          className="text-sm font-medium text-muted-foreground transition-colors dark:hover:text-primary hover:text-gray-800"
        >
          Sign In
        </Link>
        <Button onClick={handleSignOut}>Sign Out</Button>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
