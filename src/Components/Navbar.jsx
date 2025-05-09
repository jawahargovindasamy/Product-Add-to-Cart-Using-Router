import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({cart_length}) => {
  return (
    <div className="bg-white shadow-sm px-4 py-2 flex justify-between items-center">
      <div className="text-xl font-bold text-indigo-600 cursor-pointer">
        <Link to="/">Vista Mart</Link>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* Cart Icon */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Link to="/cart">
            <FaShoppingCart className="text-xl cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
              {cart_length}
            </span>
          </Link>
        </button>

        {/* Profile Avatar */}
        <img
          className="w-10 h-10 object-cover rounded-full overflow-hidden border-2 border-gray-200"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          alt="Profile"
        />
      </div>
    </div>
  );
};

export default Navbar;
