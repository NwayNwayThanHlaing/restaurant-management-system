"use client";

import { useContext, useEffect, useState } from "react";
import AdminLayout from "../components/admin-layout";
import { AuthContext } from "@/app/context/auth";
import { io } from "socket.io-client";
import clsx from "clsx";

// this component is for the Active Orders page in the staff interface
function ActiveOrdersPage() {
  const [orders, setOrders] = useState([]); // holds the list of orders
  const { user } = useContext(AuthContext); // current user context

  // Fetch orders on page load
  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch orders from the server
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders`
      );
      if (response.ok) {
        const data = await response.json();

        console.log(data);
        // Filter orders based on user role
        if (user?.role === "KITCHEN_STAFF") {
          setOrders(
            data.orders.filter((order) => order.status === "PROCESSING")
          );
        } else {
          setOrders(
            data.orders.filter(
              (order) =>
                order.status === "PROCESSING" || order.status === "READY"
            )
          );
        }
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Cancel an order
  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${orderId}/cancel`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        setOrders(
          orders.map((order) => {
            if (order.id === orderId) {
              return { ...order, status: "CANCELLED" };
            }
            return order;
          })
        );
        alert("Order cancelled successfully!");
        fetchOrders();
      } else {
        console.error("Failed to update order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Mark an order as delivered
  const deliverOrder = async (orderId) => {
    try {
      const socket = new io("${process.env.NEXT_PUBLIC_API_URL}");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${orderId}/delivered`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        setOrders(orders.filter((order) => order.id !== orderId));
        alert("Order delivered successfully!");

        socket.emit("status-changed", { id: orderId, status: "DELIVERED" });
        fetchOrders();
      } else {
        console.error("Failed to update order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Mark an order as ready
  const readyOrder = async (orderId) => {
    try {
      const socket = new io("${process.env.NEXT_PUBLIC_API_URL}");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${orderId}/ready-to-deliver`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        setOrders(
          orders.map((order) => {
            if (order.id === orderId) {
              return { ...order, status: "READY" };
            }
            return order;
          })
        );
        alert("Order is ready!");
        socket.emit("status-changed", { id: orderId, status: "READY" });
        fetchOrders();
      } else {
        console.error("Failed to update order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Socket connected for real-time updates
  useEffect(() => {
    const socket = io("${process.env.NEXT_PUBLIC_API_URL}");

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("new-order", (order) => {
      console.log("new order", order);
      fetchOrders();
    });

    socket.on("status-changed", (order) => {
      console.log("status changed", order);
      fetchOrders();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // rendering the active orders page
  return (
    <AdminLayout>
      <div className="pt-20 mt-16">
        <div
          className={clsx(
            "w-4/5 pt-5 pb-36 absolute right-0 m-auto",
            user?.role === "KITCHEN_STAFF" && "w-full m-auto"
          )}
        >
          <div className="m-auto">
            <h1 className="text-lg font-bold mb-12 pl-60">
              Welcome! You have {orders.length} orders:
            </h1>
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex justify-around items-center my-4"
              >
                <div className="py-10 px-16 bg-blue-950 text-white w-3/5 rounded-xl flex justify-between">
                  <div className="">
                    <h4 className="font-bold text-lg">
                      Table #{order.table_no}
                    </h4>
                    {order.order_menus?.map((item, i) => (
                      <p key={i}>
                        {item.quantity} x {item.menu.name}{" "}
                      </p>
                    ))}
                    <p className="font-bold text-lg mt-2">
                      Order Total: £
                      {order.order_menus
                        ?.reduce((total, item) => {
                          return total + item.quantity * (item.menu.price || 0);
                        }, 0)
                        .toFixed(2)}
                    </p>
                    <p>
                      Order At:{" "}
                      {new Date(order.orderAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="w-52">
                    <p className="py-1 my-2 w-full text-center border-2 border-green-500 rounded-xl text-white">
                      {order.status}
                    </p>
                    {user?.role === "KITCHEN_STAFF" && (
                      <button
                        onClick={() => readyOrder(order.id)}
                        className="py-1 px-4 my-2 w-full bg-red-800 w-50 rounded-xl text-white hover:bg-red-900"
                      >
                        Ready
                      </button>
                    )}

                    {(user?.role === "WAITER" || user?.role === "ADMIN") && (
                      <>
                        <button
                          {...(order.status === "PROCESSING" && {
                            disabled: true,
                          })}
                          onClick={() => deliverOrder(order.id)}
                          className={clsx(
                            "py-1 px-4 my-2 w-full  w-50 rounded-xl ",
                            order.status !== "PROCESSING"
                              ? "bg-green-700 text-white"
                              : "bg-gray-900 text-gray-600"
                          )}
                        >
                          Delivered
                        </button>
                        <br />
                        {order.status === "PROCESSING" && (
                          <button
                            onClick={() => cancelOrder(order.id)}
                            className="py-1 px-4 my-2 w-full bg-red-700 hover:bg-red-800 w-50 rounded-xl text-white"
                          >
                            Cancel
                          </button>
                        )}
                        <br />
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default ActiveOrdersPage;
