"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { io } from "socket.io-client";

// component for the tables page
function TablesPage() {
  const [orders, setOrders] = useState([]);

  // function to fetch orders
  const fetchOrders = async () => {
    const response = await fetch(
      "${process.env.NEXT_PUBLIC_API_URL}/admin/orders"
    );
    const data = await response.json();
    setOrders(
      data.orders?.filter(
        (order) => order.status !== "CANCELLED" && order.status !== "PAID"
      )
    );
  };

  // effect to fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // effect for socket connection and event listeners
  useEffect(() => {
    const socket = io("${process.env.NEXT_PUBLIC_API_URL}");

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("status-changed", (order) => {
      console.log("status changed", order);
      fetchOrders();
    });

    // cleanup function to disconnect socket
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-[#eadaa2] h-full">
      <div>
        <img
          className="opacity-50 relative top-0 left-0 z-1 h-screen w-full"
          src="../kitchen_staff.jpeg"
          style={{ width: "100%", objectFit: "cover" }}
        />

        <button className="absolute top-28 left-5 z-10 bg-red-800 font-semibold text-white px-4 py-2 rounded-md hover:bg-red-900 hover:text-white">
          <Link href="/admin/active-orders">Back to Dashboard</Link>
        </button>

        <div className="absolute top-56 left-60">
          <h4 className="text-lg font-semibold text-center text-white bg-red-800 py-4">
            Table Layout
          </h4>
          <div className="mt-15 bg-black opacity-80 m-auto z-5">
            <div className="grid grid-cols-5 gap-1 p-10">
              {Array.from({ length: 20 }).map((_, index) => (
                <Link
                  key={index}
                  href={`/admin/tables/${index + 1}`}
                  className={clsx(
                    "bg-[#ece0b4] text-center text-black text-md font-bold px-12 mx-7 my-4 py-3 hover:bg-[#e3ce7d] cursor-pointer",
                    orders.some((order) => order.table_no == index + 1) &&
                      "bg-red-700 text-white hover:bg-red-800"
                  )}
                >
                  T{index + 1}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TablesPage;
