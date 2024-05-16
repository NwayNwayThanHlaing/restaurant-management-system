"use client";

import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// creating CartContext with default empty values
export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  submitOrder: () => {},
  clearCart: () => {},
  tableNumber: 0,
  setTableNumber: () => {},
});

// CartProvider component to provide CartContext to its children
export default function CartProvider({ children }) {
  // state variable for cart and tableNumber
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState("");

  // function to add item to cart
  function addToCart(item) {
    console.log(item);
    if (cart.some((cartItem) => cartItem.name === item.name)) {
      setCart(
        cart.map((cartItem) => {
          if (cartItem.name === item.name) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        })
      );
      return;
    }
    setCart([...cart, { ...item, quantity: 1 }]);
  }

  // function to remove item from cart
  function removeFromCart(item) {
    if (item.quantity > 1) {
      setCart(
        cart.map((cartItem) => {
          if (cartItem.name === item.name) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }
          return cartItem;
        })
      );
      return;
    }
    setCart(cart.filter((cartItem) => cartItem.name !== item.name));
  }

  // function to submit an order
  async function submitOrder() {
    const socket = new io("http://localhost:3333");
    try {
      const orderData = {
        table_no: tableNumber,
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };

      const response = await fetch("http://localhost:3333/admin/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        clearCart();

        socket.emit("new-order", orderData);
        alert("Order placed successfully!");
      } else {
        alert(
          `Failed to place order. Please try again later.\nOrder Data: ${JSON.stringify(
            orderData
          )}`
        );
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert(
        "An error occurred while submitting the order. Please try again later."
      );
    }
  }

  // function to handle change in table number
  const handleTableNumberChange = (event) => {
    setTableNumber(event.target.value);
  };

  // function to clear the cart
  const clearCart = () => setCart([]);

  // providing values to CartContext
  return (
    <CartContext.Provider
      value={{
        cart: cart,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        submitOrder: submitOrder,
        clearCart: clearCart,
        tableNumber: tableNumber,
        setTableNumber: setTableNumber,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
