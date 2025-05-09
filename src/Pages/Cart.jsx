import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart, addToCart, removeFromCart }) => {
  const totalItemsPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discountPrice = totalItemsPrice * 0.1;
  const platformFee = 10;
  const deliveryFee = totalItemsPrice > 500 ? 0 : 15;

  const totalPrice = (
    totalItemsPrice +
    platformFee +
    deliveryFee -
    discountPrice
  ).toFixed(2);

  const decreaseQuantity = (ItemId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === ItemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-cyan-100 px-2 sm:px-4 p-4">
      {cart.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-xl mx-auto mt-20">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-gray-500 mb-4">
            Looks like you haven't added anything yet.
          </p>
          <Link to="/">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-6 rounded-full text-lg transition">
              Go To Products
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition h-full flex flex-col"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-60 w-full object-contain mb-4"
                />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold mb-1 line-clamp-1">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <p className="text-indigo-600 font-bold text-base">
                    ${item.price}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        item.quantity > 1 && decreaseQuantity(item.id)
                      }
                      className={`relative px-2 rounded text-gray-800 
                        ${
                          item.quantity === 1
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-gray-300 hover:bg-gray-400 cursor-pointer"
                        }`}
                      disabled={item.quantity === 1}
                      title={
                        item.quantity === 1
                          ? "Minimum quantity is 1"
                          : "Decrease quantity"
                      }
                    >
                      −
                    </button>
                    <span className="text-md">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 rounded cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm transition cursor-pointer"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="max-w-md mx-auto w-full sm:w-auto mt-8 bg-white p-6 rounded-lg shadow flex flex-col gap-4">
            <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
              <h3 className="text-xl font-bold mb-4 text-center">
                Cart Summary
              </h3>

              <div className="flex justify-between mb-2">
                <span>Price ({cart.length} items)</span>
                <span>${totalItemsPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Discount</span>
                <span>-${discountPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Platform Fee</span>
                <span>+${platformFee}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Delivery Charges</span>
                <span>
                  {deliveryFee === 0 ? (
                    <>
                      <del>$15</del>{" "}
                      <span className="text-green-600 font-semibold">Free</span>
                    </>
                  ) : (
                    `$${deliveryFee}`
                  )}
                </span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between font-bold text-xl">
                <span>Total Amount</span>
                <span>${totalPrice}</span>
              </div>

              <p className="text-green-600 font-semibold text-lg mt-4">
                You will save ₹{discountPrice.toFixed(0)} on this order
              </p>

            </div>

            <Link to="/" className="self-center w-full sm:w-auto">
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 sm:px-6 rounded-full text-md transition mt-4 w-full sm:w-auto cursor-pointer">
                Continue Shopping
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
