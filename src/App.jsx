import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import PageNotFound from "./Pages/PageNotFound";
import Navbar from "./Components/Navbar";

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const isProductInCart = prev.find((item) => item.id === product.id);
      if (isProductInCart) {
        return prev.map((item) => {
          return item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <div>
      <BrowserRouter>
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
          <Navbar cart_length={cart.length} />
        </nav>

        <div className="pt-14">
          <Routes>
            <Route
              path="/"
              element={
                <Products
                  cart={cart}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  setCart={setCart}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
