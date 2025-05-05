import React, { useState, useEffect } from 'react';
import axios from 'axios';
import noProductFound from '../../assets/productNot.jpeg';
import { FaSearchDollar } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enteredPrice, setEnteredPrice] = useState('')

  const fetchData = () => {
    setError(null);
    setLoading(true);
    axios
      .get('https://dummyjson.com/products')
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch products');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const query = useSelector((state) => state.search.query.trim().toLowerCase());
  const filteredProducts =
    query.length > 0
      ? products.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      )
      : products;

  // filter on the base of price

  const filterProducts = products.filter((product) => {
    const price = Number(enteredPrice);  
    return !isNaN(price) && product.price < price; 
  });
  if (error) {
    navigate('/error');
    return null;
  }

  return (
    <section className="contain mx-auto px-4 py-8 dark:bg-gray-800 dark:text-white">
      {loading ? (
        <div className="relative h-[85vh]">
          <p className="loader absolute top-[40%] right-[50%]"></p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex items-center justify-center">
          <img className="h-[85vh]" src={noProductFound} alt="No Products Found" />
        </div>
      ) : (
        <>
          {/* Search Bar Section */}
          <section className="">
            <div className="relative w-40">
              <input
                type="number"
                placeholder="Enter price"
                value={enteredPrice}
                onChange={(e)=>setEnteredPrice(e.target.value)}
                className="w-full pl-3 pr-10 py-2 rounded-md border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-300 cursor-pointer"
                onClick={() => {
                  console.log('button clicked');
                  
                  filterProducts
                }}
              >
                <FaSearchDollar />
              </div>
            </div>
          </section>

          {/* Products Grid Section */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="mt-5 bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-40 sm:h-48 md:h-56 lg:h-60 xl:h-64 w-full object-contain hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between">
                    <h2 className="text-lg font-semibold mb-2 dark:text-white">{product.title}</h2>
                    <h4
                      className={`${product.availabilityStatus === 'Low Stock'
                        ? 'text-red-500'
                        : 'text-green-500'
                        } font-semibold mb-2`}
                    >
                      {product.availabilityStatus}
                    </h4>
                  </div>
                  <h3 className="text-md font-semibold mb-2 dark:text-gray-300">
                    {product.category}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      ${product.price}
                    </span>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer"
                      onClick={() => {
                        dispatch(addToCart(product));
                        toast.success(`${product.title} added to cart!`);
                        const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
                        const updatedCart = [...existingCart, product];
                        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </section>
  );
};

export default Products;
