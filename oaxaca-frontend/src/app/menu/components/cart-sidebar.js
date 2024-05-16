import React from "react";
import "./style.css";

// component for displaying cart items and total price
const CartSidebar = ({ cart, removeFromCart, onClose }) => {
  // calculate total price of items in the cart
  const totalPrice = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  return (
    <div className="sidebar">
      <button onClick={onClose} className="close-btn">
        x
      </button>
      <h1>Cart</h1>
      <div className="cart-items">
        {cart.map((item, idx) => (
          <div className="item" key={idx}>
            <h3>{item.name}</h3>
            <h4>{"£" + item.price}</h4>
            <img alt={item.name} src={item.image} />
            <div className="button-container">
              <button
                onClick={() => removeFromCart(item)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="button-container">
        <div className="total">Total: £{totalPrice}</div>
        <button className="checkout_button">Checkout</button>
      </div>
    </div>
  );
};

export default CartSidebar;
