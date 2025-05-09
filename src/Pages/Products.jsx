import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductsList from "../Components/ProductsList";

const Products = ({ cart, addToCart, removeFromCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchData = async () => {
    setError(null);
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-3xl font-bold">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-3xl font-bold text-red-600">
        <p>Error: {error.message || "Something went wrong!"}</p>
        <button
          onClick={fetchData}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded text-base"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-cyan-200">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
            <ProductsList
              product={product}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              inCart={isInCart(product.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
