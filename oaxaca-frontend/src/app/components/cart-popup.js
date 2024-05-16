import { useContext } from "react";
import { CartContext } from "../context/cart";
import { useRouter } from "next/navigation";

// component for cart pop-up
export default function CartPopUp() {
  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    submitOrder,
    tableNumber,
    setTableNumber,
  } = useContext(CartContext);

  // function to handle table number change
  const handleTableNumberChange = (event) => {
    setTableNumber(event.target.value);
  };

  const handleSubmitOrder = async () => {
    submitOrder(); // Call the submitOrder function from context
    router.push("/payment");  // redirect to payment page after submitting order
  };

  const router = useRouter(); // initialise useRouter hook

  // structure for cart pop-up component 
  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <span className="text-xl font-semibold p-4">Cart Items</span>
      <hr />
      <div className="flex justify-between">
        <div className="mx-4">
          {cart.map((cartItem) => (
            <div className="py-5 border-b-2 ">
              <div className="flex items-center">
                <img
                  src={cartItem.image}
                  alt={cartItem.name}
                  className="w-16 h-13 object-contain mr-4"
                />
                <div>
                  <span className="text-md font-semibold">{cartItem.name}</span>
                  <div className="pt-1 flex justify-between items-center">
                    <div className="bg-white rounded-lg border-2 border-red-700">
                      <button
                        onClick={() => removeFromCart(cartItem)}
                        className="bg-red-700 px-1.5 text-white rounded-l-sm"
                      >
                        -
                      </button>
                      <span className="px-2 text-sm text-gray-600">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(cartItem)}
                        className="bg-red-700 px-1.5 text-white rounded-r-sm"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-md">
                      £{(cartItem.price * cartItem.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center px-5 py-2 font-bold text-md">
        <span> Total : </span>
        <span>
          £
          {cart
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between items-center px-5 pb-5 font-bold text-md">
        <span>Table No:</span>
        <input
          type="text"
          placeholder="Enter Table No."
          value={tableNumber}
          onChange={handleTableNumberChange}
          className="border-2 border-red-700 rounded-lg px-2 py-1 w-1/2 text-md font-semibold text-sm"
        />
      </div>
      <div className="flex justify-center items-center font-bold text-md">
        <button
          className="bg-red-700 text-white rounded-lg px-4 py-2 w-11/12"
          onClick={handleSubmitOrder}
        >
          Send Order
        </button>
      </div>
    </div>
  );
}
