import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card';
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
  const [enteredPrice, setEnteredPrice] = useState('');

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products')
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch products');
      });
  }, []);

  const handleBuyNow = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart`);
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const query = useSelector((state) => state.search.query.trim().toLowerCase());
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query)
  );

  const priceFilteredProducts = enteredPrice
    ? filteredProducts.filter((p) => p.price < Number(enteredPrice))
    : filteredProducts;

  if (error) {
    navigate('/error');
    return null;
  }

  return (
    <section className="contain mx-auto px-4 py-8 dark:bg-gray-800 dark:text-white">
      {/* Price Filter */}
      <section className="mb-4">
        <div className="relative w-40">
          <input
            type="number"
            placeholder="Enter price"
            value={enteredPrice}
            onChange={(e) => setEnteredPrice(e.target.value)}
            className="w-full pl-3 pr-10 py-2 rounded-md border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-300 cursor-pointer">
            <FaSearchDollar />
          </div>
        </div>
      </section>

      {/* Loading */}
      {loading ? (
        <div className="relative h-[85vh]">
          <p className="loader absolute top-[40%] right-[50%]"></p>
        </div>
      ) : priceFilteredProducts.length === 0 ? (
        <div className="flex items-center justify-center">
          <img className="h-[85vh]" src={noProductFound} alt="No Products Found" />
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {priceFilteredProducts.map((product) => (
            <Card key={product.id} product={product} handleBuyNow={handleBuyNow} />
          ))}
        </section>
      )}
    </section>
  );
};

export default Products;
