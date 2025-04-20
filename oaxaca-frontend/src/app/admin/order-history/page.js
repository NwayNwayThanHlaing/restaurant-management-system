"use client";

import { X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import AdminLayout from "../components/admin-layout";

// comoenent for order history page
export default function OrderHistoryPage() {
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  // effect hook to fetch orders
  useEffect(() => {
    fetchOrders();
  }, []);

  // function to fetch orders from the server
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setCancelledOrders(
          data.orders.filter((order) => order.status === "CANCELLED")
        );
        setCompletedOrders(
          data.orders.filter((order) => order.status === "DONE")
        );
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // function to remove an order
  const removeOrder = async (orderId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${orderId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setCancelledOrders(
          cancelledOrders.filter((order) => order.id !== orderId)
        );
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // function to mark an order as delivered
  const deliveredOrder = async (orderId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/${orderId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setCompletedOrders(
          completedOrders.filter((order) => order.id !== orderId)
        );
      } else {
        console.error("Failed to update order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="w-full pt-20 mt-16 h-screen overflow-hidden">
        <div className="w-4/5 pt-5 pb-36 absolute right-0">
          <Tabs defaultValue="completed">
            <div className="flex justify-between items-center w-3/5 m-auto">
              <h3 className="text-xl font-bold">Order History</h3>
              <TabsList>
                <TabsTrigger value="completed">Completed Orders</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled Orders</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="completed">
              <div>
                <h1 className="text-lg font-bold mb-5 mt-8 pl-60 w-3/5">
                  Welcome! You have {completedOrders.length} completed orders:
                </h1>
                {completedOrders.map((order, index) => (
                  <div
                    key={index}
                    className="flex justify-around items-center my-4"
                  >
                    <div className="py-10 px-16 bg-green-800 w-3/5 text-white rounded-xl flex justify-between">
                      <div className="">
                        <h4 className="font-bold text-lg">
                          Table #{order.table_no}
                        </h4>
                        {order.order_menus.map((item, i) => (
                          <div>
                            <p key={i}>
                              {item.quantity} x {item.menu.name}
                            </p>
                          </div>
                        ))}
                        <p className="font-bold text-lg mt-2">
                          Order Total: £
                          {order.order_menus
                            ?.reduce((total, item) => {
                              return (
                                total + item.quantity * (item.menu.price || 0)
                              );
                            }, 0)
                            .toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => deliveredOrder(order.id)}
                        className="w-7 h-7 border-2 border-white text-red p-0.5 rounded-xl"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="cancelled">
              <div>
                <h1 className="text-lg font-bold mb-5 mt-8 pl-60">
                  Welcome! You have {cancelledOrders.length} cancelled orders:
                </h1>
                {cancelledOrders.map((order, index) => (
                  <div
                    key={index}
                    className="flex justify-around items-center my-4"
                  >
                    <div className="py-10 px-16 bg-gray-900 text-white w-3/5 rounded-xl flex justify-between">
                      <div className="">
                        <h4 className="font-bold text-lg">
                          Table #{order.table_no}
                        </h4>
                        {order.order_menus.map((item, i) => (
                          <p key={i}>
                            {item.quantity} x {item.menu.name}
                          </p>
                        ))}
                      </div>
                      <button
                        onClick={() => removeOrder(order.id)}
                        className="w-7 h-7 border-2 border-white text-red p-0.5 rounded-xl"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
}
