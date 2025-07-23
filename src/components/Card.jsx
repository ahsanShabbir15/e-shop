import React from 'react'
    const Card = ({ product, handleBuyNow }) => {
    const { availabilityStatus, category, title, description, price,thumbnail } = product;
    
    return (
        <>
            <div
                className="mt-5 bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col"
            >
                <img src={thumbnail} alt=''
                    className="h-40 sm:h-48 md:h-56 lg:h-60 xl:h-64 w-full object-contain hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-lg font-semibold mb-2 dark:text-white">{title}</h2>
                    <div className="flex justify-between container">
                        <h3 className="text-md font-semibold mb-2 dark:text-gray-300">
                            {category}
                        </h3>
                        <h4
                            className={`${availabilityStatus === 'Low Stock' ? 'text-red-500' : 'text-green-500'} font-semibold mb-2`}
                        >
                            {availabilityStatus}
                        </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {description}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">
                            ${price}
                        </span>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer"
                            onClick={() => {
                                handleBuyNow(product)
                            }}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Card
