import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import noProductFound from '../../assets/productNot.jpeg';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../redux/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleIncrease = (id) => {
    dispatch(increaseQuantity({ id }));
    toast.info('Quantity increased');
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity({ id }));
    toast.info('Quantity decreased');
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
    toast.error('Item removed from the cart');
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-[85vh]">
        <img src={noProductFound} alt="No products" className="h-full object-contain" />
      </div>
    );
  }

  return (
    <div className="contain grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {cartItems.map((product) => (
        <div
          key={product.id}
          className="mt-3 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col"
        >
          <div className="flex items-center justify-center h-40">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="p-3 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-semibold text-sm w-[70%]">
                {product.title.length > 30 ? `${product.title.slice(0, 30)}...` : product.title}
              </h2>
              <h4
                className={`${
                  product.availabilityStatus === 'Low Stock'
                    ? 'text-red-500'
                    : 'text-green-600'
                } text-center w-[25%] font-semibold`}
              >
                {product.availabilityStatus}
              </h4>
            </div>

            <div className="flex items-center justify-between my-2">
              <div className="flex items-center space-x-3">
                <button
                  className="text-2xl font-semibold w-8 h-8 bg-blue-100 hover:bg-blue-300 rounded-md"
                  onClick={() => handleDecrease(product.id)}
                >
                  -
                </button>
                <span className="text-lg font-semibold">{product.quantity}</span>
                <button
                  className="text-xl font-bold w-8 h-8 bg-blue-100 hover:bg-blue-300 rounded-md"
                  onClick={() => handleIncrease(product.id)}
                >
                  +
                </button>
              </div>

              <FaTrashAlt
                className="text-red-500 text-lg cursor-pointer hover:scale-110 active:scale-90 transition-transform"
                onClick={() => handleRemove(product.id)}
              />
            </div>

            <div className="text-sm bg-blue-50 text-blue-700 font-semibold text-center my-3 py-2 px-4 rounded-lg border border-blue-200 shadow-sm">
              ${product.price} × {product.quantity} ={' '}
              <span className="font-bold">${(product.price * product.quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
