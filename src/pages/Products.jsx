import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext';
import products from '../data/products';

const Products = () => {
  const [activeTab, setActiveTab] = useState('straight');
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = async (product, variant) => {
    try {
      await addToCart(product, variant);
      // You could add a success toast here
      // Example: toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      // You could show an error toast here
      // Example: toast.error('Failed to add item to cart. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Our Products
        </h1>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <nav className="flex space-x-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('straight')}
              className={`px-3 py-2 font-medium text-sm rounded-md ${
                activeTab === 'straight'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Straight Bundles
            </button>
            <button
              onClick={() => setActiveTab('waterwave')}
              className={`px-3 py-2 font-medium text-sm rounded-md ${
                activeTab === 'waterwave'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Waterwave Bundles
            </button>
          </nav>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products[activeTab]?.map((product) => (
            <div key={product.id} className="group relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {product.name} - {product.color}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                
                {/* Variants */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Available Lengths:</h4>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {product.variants.map((variant, index) => (
                      <button
                        key={index}
                        onClick={() => handleAddToCart(product, variant)}
                        className="flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
                      >
                        <span>{variant.length}</span>
                        <span>${variant.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Products.propTypes = {
  // No props are being passed to this component currently,
  // but we can add prop types if needed in the future
};

export default Products;
