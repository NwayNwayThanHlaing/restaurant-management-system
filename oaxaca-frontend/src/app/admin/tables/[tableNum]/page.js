"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { X } from "lucide-react";
import { TableCartContext } from "@/app/context/table-cart";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import PayForm from "./create-pay";

// compoenent for table num page
function tableNumPage({ params, currentItems, setCurrentItems }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [filteredMenus, setFilteredMenus] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);

  let service = 0.0;

  // context hook to access cart items
  const { getCart } = useContext(TableCartContext);

  // destructuring cart methods from the context
  const { cartItems, addToCart, removeFromCart, getSubtotal, clearCart } =
    getCart(params.tableNum);

  // state variables for order subtotal and total
  const [orderSubTotal, setOrderSubTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  // effect to update subtotal when cart items change
  useEffect(() => {
    setSubTotal(orderSubTotal + getSubtotal());
  }, [getSubtotal(), orderSubTotal]);

  // function to handle order submission
  const handleSubmitOrder = async () => {
    const response = await fetch(
      "${process.env.NEXT_PUBLIC_API_URL}/admin/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table_no: params.tableNum,
          items: cartItems,
        }),
      }
    );

    if (response.ok) {
      alert("Order placed successfully");

      const data = await response.json();

      const newOrders = {
        ...data,
        order_menus: data.order_menus.map((m) => {
          const { id, quantity, ...menu } = m;
          return {
            id,
            quantity,
            menu: {
              ...menu,
              price: parseFloat(menu.price),
            },
          };
        }),
      };

      setOrders([...orders, newOrders]);

      let temp = 0;
      newOrders.order_menus.forEach((b) => {
        console.log(b);
        temp += b.quantity * b.menu.price;
      });

      setOrderSubTotal(orderSubTotal + temp);

      clearCart();
    } else {
      alert("Failed to place order");
    }
  };

  // effect to fetch categories, menus, and orders
  useEffect(() => {
    fetch("${process.env.NEXT_PUBLIC_API_URL}/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));

    fetch("${process.env.NEXT_PUBLIC_API_URL}/menu")
      .then((response) => response.json())
      .then((data) => setMenus(data.menus));

    fetch("${process.env.NEXT_PUBLIC_API_URL}/admin/orders")
      .then((response) => response.json())
      .then((data) => {
        let a = data.orders.filter(
          (order) =>
            order.table_no == params.tableNum && order.status !== "PAID"
        );
        setOrders(a);
        let temp = 0;
        a.forEach((a) => {
          a.order_menus.forEach((b) => {
            console.log(b);
            temp += b.quantity * b.menu.price;
          });
        });

        setOrderSubTotal(temp);
      });
  }, []);

  // effect to filter menus based on selected category
  useEffect(() => {
    setFilteredMenus(
      menus.filter((menu) => menu.categoryId === selectedCategoryId)
    );
  }, [menus]);

  return (
    <div className="bg-[#eadaa2] h-screen">
      <div>
        <img
          className="opacity-50 relative top-0 left-0 h-screen overflow-auto w-full"
          src="../../kitchen_staff.jpeg"
          style={{ width: "100%", objectFit: "cover" }}
        />

        <div className="absolute top-0 left-15 flex justify-between h-screen w-full">
          <div className="bg-black opacity-80 w-2/3 pt-36">
            <div className="grid grid-cols-4 gap-1 p-10">
              {/* <p className="bg-blue-300 text-white">
                {JSON.stringify(cartItems)}
              </p> */}
              {filteredMenus?.map((menu, index) => (
                <div key={index}>
                  <button
                    className="bg-[#ece0b4] text-center text-black text-sm font-bold mx-7 w-40 px-3 h-20 hover:bg-[#e3ce7d] cursor-pointer"
                    onClick={() => addToCart(menu, params.tableNum)}
                  >
                    {menu.name}
                  </button>
                  <p className="text-white font-bold text-sm text-center mt-1 mb-10">
                    £{menu.price}
                  </p>
                </div>
              ))}
            </div>

            <div className="fixed left-0 bottom-0 w-2/3">
              {categories.map((category) => (
                <button
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    setFilteredMenus(
                      menus.filter((menu) => menu.categoryId === category.id)
                    );
                  }}
                  className={`bg-red-700 text-white py-4 px-4 w-1/5 shadow-md font-bold shadow-red-950 cursor-pointer ${
                    selectedCategoryId === category.id
                      ? "bg-red-900 text-white"
                      : ""
                  }`}
                  key={category.id}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#eadaa2] w-1/3 pt-36 p-10 h-screen overflow-auto">
            <Link
              className="fixed right-2 top-24 bg-red-700 rounded-md text-white p-0.5"
              href="/admin/tables"
            >
              <X size={17} />
            </Link>
            <p className="font-bold text-lg text-center">Order Summary</p>
            <h4 className="font-bold text-lg text-center mb-6">
              Table #{params.tableNum}
            </h4>
            {orders.map((order) => (
              <>
                {order.order_menus?.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <p>
                      {item.quantity} x {item.menu?.name}
                    </p>
                    <p>£{(item.quantity * item.menu?.price).toFixed(2)}</p>
                  </div>
                ))}
              </>
            ))}
            {cartItems?.map((i) => (
              <div
                key={i.id}
                className="flex justify-between items-center font-bold"
              >
                <p>
                  <button
                    onClick={() => removeFromCart(i)}
                    className="bg-red-700 text-white p-1 hover:bg-red-800 rounded-md mr-2"
                  >
                    <Minus size={12} />
                  </button>
                  {i.quantity}
                  <button
                    onClick={() => addToCart(i)}
                    className="bg-red-700 text-white p-1 hover:bg-red-800 rounded-md ml-2 mr-3"
                  >
                    <Plus size={12} />
                  </button>
                  {i.name}
                </p>
                <p>£{(i.quantity * i.price).toFixed(2)}</p>
              </div>
            ))}

            <div className="font-bold text-md flex justify-between border-t-2 pt-5 mt-5 border-black">
              <span>Subtotal </span>
              <span>£{subTotal.toFixed(2)}</span>
            </div>
            <div className="text-md flex justify-between pt-2 ">
              <span>Service Charge (10%) </span>
              <span>£{(service = (subTotal * 0.1).toFixed(2))}</span>
            </div>
            <div className="font-bold text-lg flex justify-between pt-4">
              <span>Total </span>
              <span>
                £{(parseFloat(subTotal) + parseFloat(service)).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center text-md mt-10">
              <PayForm
                order_ids={orders.map((order) => order.id)}
                disabled={subTotal == 0 || orders.length == 0}
                rightAmount={(
                  parseFloat(subTotal) + parseFloat(service)
                ).toFixed(2)}
                setOrders={setOrders}
                setSubTotal={setSubTotal}
              />

              <button
                disabled={cartItems?.length == 0}
                className="bg-red-700 text-white px-24 py-2 cursor-pointer hover:bg-red-800"
                onClick={handleSubmitOrder}
              >
                Order
              </button>
              <button className="bg-red-700 text-white px-5 py-2 cursor-pointer hover:bg-red-800">
                <Link href="#">Print</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default tableNumPage;
