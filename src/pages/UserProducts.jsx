import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/api'
import PulseLoader from "react-spinners/PulseLoader";

export default function UserProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/user/products/getProducts");
      const filteredProducts = response.data.products.filter(
        (product) => product.quantity > 1
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="pt-24 mx-10">
      <h1 className="text-3xl font-bold mb-5">Available Products</h1>

      {loading ? (
        <div className="flex justify-center h-96 items-center">
          <PulseLoader />
        </div>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-contain rounded-md"
              />
              
             
              <div className="flex items-center justify-between mt-3">
                <div>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600 text-sm">Qty: {product.quantity}</p>
                </div>

                <button className="bg-gray-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-black hover:shadow-xl">
                  Buy Now
                </button>
              </div>

              <p className="text-gray-700 mt-2">
                {product.description.length > 80
                  ? product.description.slice(0, 80) + "..."
                  : product.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
