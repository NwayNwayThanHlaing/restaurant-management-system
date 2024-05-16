"use client";

import { createContext, useEffect, useState } from "react";

// creating TableCartContext with default empty values
export const TableCartContext = createContext({
  cart: [],
  addToCart: () => {},
  getCart: () => {},
  getSubtotal: () => {},
});

// TableCartProvider component to provide TableCartContext to its children
export default function TableCartProvider({ children }) {
  // state variable for cart
  const [cart, setCart] = useState([]);

  // initialise cart with 20 tables
  useEffect(() => {
    {
      let temp = [];
      Array.from({ length: 20 }).forEach((_, index) => {
        temp = [
          ...temp,
          {
            tableNum: index + 1,
            items: [],
          },
        ];
      });

      setCart(temp);
    }
  }, []);

  // function to get cart for a specific table number
  function getCart(tableNum) {
    const cartItems = cart.find((table) => table.tableNum == tableNum)?.items;

    // function to add an item to cart for a specific table number
    const addToCart = (item) => {
      setCart(
        cart.map((table) => {
          if (table.tableNum == tableNum) {
            return {
              ...table,
              items: table.items.some((cartItem) => cartItem.id == item.id)
                ? table.items.map((cartItem) => {
                    if (cartItem.id == item.id) {
                      return {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                      };
                    }
                    return cartItem;
                  })
                : [...table.items, { ...item, quantity: 1 }],
            };
          }
          return table;
        })
      );
    };

    // function to remove an item from cart for a specific table number
    const removeFromCart = (item) => {
      setCart(
        cart.map((table) => {
          if (table.tableNum == tableNum) {
            return {
              ...table,
              items:
                table.items.find((cartItem) => cartItem.id == item.id)
                  ?.quantity > 1
                  ? table.items.map((cartItem) => {
                      if (cartItem.id == item.id) {
                        return {
                          ...cartItem,
                          quantity: cartItem.quantity - 1,
                        };
                      }
                      return cartItem;
                    })
                  : table.items.filter((cartItem) => cartItem.id !== item.id),
            };
          }
          return table;
        })
      );
    };

    // function to clear cart for specific table number
    const clearCart = () => {
      setCart(
        cart.map((table) => {
          if (table.tableNum == tableNum) {
            return {
              ...table,
              items: [],
            };
          }
          return table;
        })
      );
    };

    // function to calculate subtotal for specific table number
    const getSubtotal = () => {
      return cartItems?.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
    };

    // returning necessary functions and data
    return {
      cartItems,
      addToCart,
      removeFromCart,
      getSubtotal,
      clearCart,
    };
  }

  // providing values to TableCartContext
  return (
    <TableCartContext.Provider value={{ cart, getCart }}>
      {children}
    </TableCartContext.Provider>
  );
}
