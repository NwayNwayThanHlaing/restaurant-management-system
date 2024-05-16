"use client";
import { AssistanceContext } from "../context/assistance";
import { useContext } from "react";
import { CartContext } from "../context/cart";
import { ShoppingCart } from "lucide-react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CartPopUp from "./cart-popup";
import Link from "next/link";
import { AuthContext } from "../context/auth";
import AssistancePopUp from "./assistance-popup";

// component for nav bar
export default function NavBar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const {
    tableNumber,
    reason,
    handleTableNumberChange,
    handleReasonChange,
    handleSend,
  } = useContext(AssistanceContext);

  // structure for nav bar component
  return (
    <nav className="flex text-lg font-semibold bg-[#eadaa2] shadow-md px-[9vw] py-3 justify-between items-center fixed top-0 w-full z-50">
      <img className="h-16 w-16" src="/logo.png" />
      <div className="flex gap-5 items-center">
        <Link href="/">Home</Link>
        <Link href="/about-us">About Us</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/contact-us">Contact Us</Link>
        {user ? (
          <div className="items-center flex justify-between">
            <Link className="mr-5" href="/admin/active-orders">
              {user.username}
            </Link>
            <AlertDialog>
              <AlertDialogTrigger>
                <LogOut />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Sign out</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to log out?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={logout}>logout</AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : (
          <Link href="/log-in">Log In</Link>
        )}
        {user ? (
          <></>
        ) : (
          <div className="items-center flex justify-around">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="flex gap-2 bg-red-700 text-white p-2 mr-3 rounded-md hover:bg-red-900 hover:text-white"
                  variant="outline"
                >
                  <ShoppingCart />
                  <span className="font-light">
                    (
                    {cart.reduce((prev, current) => {
                      return prev + current.quantity;
                    }, 0)}
                    )
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <CartPopUp />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="flex gap-2 bg-red-700 text-white p-2 rounded-md hover:bg-red-900 hover:text-white"
                  variant="outline"
                >
                  <img
                    src="/waiterpic.png"
                    alt="Assistance"
                    className="w-6 h-6"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <AssistancePopUp>
                  tableNumber={tableNumber}
                  reason={reason}
                  handleTableNumberChange={handleTableNumberChange}
                  handleReasonChange={handleReasonChange}
                  handleSend={handleSend}
                </AssistancePopUp>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </nav>
  );
}
