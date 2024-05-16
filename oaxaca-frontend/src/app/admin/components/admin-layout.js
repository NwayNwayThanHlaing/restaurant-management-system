"use client";

import { LayoutDashboard } from "lucide-react"; // importing an icon component
import Link from "next/link"; // importing next.js link compoenent for navigation
import { AuthContext } from "../../context/auth"; // importing authentication context
import { useContext } from "react"; // importing react useContext hook
import { ShieldAlert } from "lucide-react"; // importing an icon component

// component for admin layout
const AdminLayout = ({ children }) => {
  const { user } = useContext(AuthContext); // retrieves user info

  // if user not logged in display access denied 
  if (!user) {
    return (
      <div className="w-1/2 mx-auto pt-20 h-screen overflow-hidden">
        <div className="mt-60 text-center pb-10 bg-gray-950 bg-opacity-80 m-auto rounded-3xl">
          <div className="text-2xl font-semibold bg-black p-7 text-red-700 flex items-center rounded-t-3xl justify-center">
            <ShieldAlert size={54} />
            <span>ACCESS DENIED</span>
          </div>
          <p className="text-white pt-10 text-md">
            This page is restricted! <br />
            Please log in with authorised username and password.
          </p>
          <button className="bg-white text-lg font-semibold text-black px-10 py-1 rounded-lg mt-8">
            <Link href="/log-in">Log In</Link>
          </button>
        </div>
      </div>
    );
  }

  // if user is kitchen, render with no sidebar
  if (user.role === "KITCHEN_STAFF") {
    return <>{children}</>;
  }

  // if user is admin or other, render with sidebar navigation
  return (
    <>
      <div className="w-1/5 bg-red-800 fixed h-screen overflow-hidden">
        {user.role !== "KITCHEN_STAFF" && (
          <>
            <p className="text-white flex flex-wrap items-center text-xl font-bold pt-14 pb-8 pl-5">
              <LayoutDashboard />
              <span className="pl-2">Dashboard</span>
            </p>
            <button className="py-4 text-white text-md hover:bg-red-900 w-full text-left pl-14 border-b-2 border-t-2 border-red-900">
              <Link href="/admin/tables">Tables</Link>
            </button>
            <button className="py-4 text-white text-md hover:bg-red-900 w-full text-left pl-14 border-b-2 border-red-900">
              <Link href="/admin/active-orders">Active Orders </Link>
            </button>
            <button className="py-4 text-white text-md hover:bg-red-900 w-full text-left pl-14 border-b-2 border-red-900">
              <Link href="/admin/order-history">Order History</Link>
            </button>

            <button className="py-4 text-white text-md hover:bg-red-900 w-full text-left pl-14 border-b-2 border-red-900">
              <Link href="/admin/assistance-requests">Assistance </Link>
            </button>
          </>
        )}

        {user.role === "ADMIN" && (
          <>
            <p className="text-white flex flex-wrap items-center text-xl font-bold pt-14 pb-8 pl-5">
              <LayoutDashboard />
              <span className="pl-2">Management</span>
            </p>
            <button className="py-4 text-white text-md hover:bg-red-900 w-full text-left pl-14 border-b-2 border-t-2 border-red-900">
              <Link href="/admin/menu-management">Menu Management</Link>
            </button>
            <button className="py-4 text-white text-md hover:bg-red-900 w-full text-left pl-14 border-b-2 border-red-900">
              <Link href="/admin/category-management">Category Management</Link>
            </button>
            <button className="py-4 text-white text-md hover:bg-red-900 w-full text-left pl-14 border-b-2 border-red-900">
              <Link href="/admin/user-management">User Management</Link>
            </button>
          </>
        )}
      </div>
      <div>{children}</div>
    </>
  );
};

export default AdminLayout;
