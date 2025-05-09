import React from "react";

const ProductsList = ({product,addToCart,removeFromCart,inCart}) => {

    

    const handleClick=()=>{
        inCart? removeFromCart(product.id) : addToCart(product)
    }

  return (
    <>
      <img src={product.image} alt={product.title} className="h-64 w-full object-contain" />
      <div>
        <h2 className="text-lg font-semibold line-clamp-1">{product.title}</h2>
        <p className="text-gray-500 text-sm line-clamp-2 my-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-base font-bold mt-2">${product.price}</p>
          <button
            className="bg-blue-400 cursor-pointer hover:bg-blue-500 text-white py-1 px-3 rounded-md text-sm"
            onClick={handleClick}
          >
            {inCart? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
