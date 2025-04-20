"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import clsx from "clsx";
import { useState } from "react";
import { io } from "socket.io-client";

// compoenent for pay form
export default function PayForm({
  disabled,
  rightAmount,
  order_ids,
  setOrders,
  setSubTotal,
}) {
  const [amount, setAmount] = useState(0);

  console.log(order_ids);

  // function to handle payment
  const handlePay = async () => {
    const socket = new io("${process.env.NEXT_PUBLIC_API_URL}");
    if (amount < rightAmount) {
      alert("Amount paid is less than the total amount");
      return;
    }
    try {
      const response = await fetch(
        "${process.env.NEXT_PUBLIC_API_URL}/admin/orders/paid",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderIds: order_ids,
          }),
        }
      );
      if (response.ok) {
        alert("Payment successful");
        socket.emit("status-changed", { order_ids });

        setOrders([]);
        setSubTotal(0);
      } else {
        alert("Payment failed");
      }
    } catch (error) {
      console.error("Error paying:", error);
      alert("Payment failed");
    }
  };

  return (
    <Dialog>
      <DialogTrigger disabled={disabled}>
        <span
          className={clsx(
            disabled
              ? "bg-gray-400 text-white py-2.5 px-6  w-full cursor-not-allowed"
              : "bg-green-700 text-white py-2.5 px-6  w-full cursor-pointer hover:bg-green-800"
          )}
        >
          Pay
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold">
            Amount Paid:
          </label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            defaultValue={amount}
            className="border border-gray-400 rounded-md w-full pl-2 h-7"
            id="amount"
          />
        </div>
        <DialogFooter>
          <button
            className="bg-red-700 text-white hover:bg-red-900 py-1 px-3 rounded-lg my-5"
            onClick={handlePay}
          >
            Pay
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
