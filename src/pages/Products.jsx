import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products';

const Products = () => {
  const [activeTab, setActiveTab] = useState('straight');
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  const { addToCart } = useCart();

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = async (product, variant) => {
    console.log('Add to cart clicked:', { product, variant });
    try {
      console.log('Before addToCart');
      await addToCart(product, variant);
      console.log('After addToCart');
      // Show a success message or update UI if needed
    } catch (error) {
      console.error('Error in handleAddToCart:', error);
    }
  };

  const handleImageError = (productId) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-purple mx-auto mb-4"></div>
          <p className="text-gray-700">Loading products...</p>
        </div>
      </div>
    );
  }

  if (!products[activeTab] || products[activeTab].length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">No products available</h2>
          <p className="mt-2 text-gray-600">Please check back later or try a different category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Our</span>
            <span className="block text-custom-purple font-medium">Products</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Explore our premium collection of hair bundles
          </p>
        </div>

        {/* Tab Navigation - Updated to match Cart page style */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setActiveTab('straight')}
              className={`px-6 py-3 text-sm font-medium rounded-l-lg ${
                activeTab === 'straight'
                  ? 'bg-custom-purple text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Straight Bundles
            </button>
            <button
              onClick={() => setActiveTab('waterwave')}
              className={`px-6 py-3 text-sm font-medium rounded-r-lg ${
                activeTab === 'waterwave'
                  ? 'bg-custom-purple text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-t border-b border-r border-gray-200'
              }`}
            >
              Waterwave Bundles
            </button>
          </div>
        </div>

        {/* Product Grid - Full width */}
        <div className="grid grid-cols-1 gap-8">
          {products[activeTab]?.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="md:w-1/3 lg:w-1/4">
                  {!imageErrors[product.id] ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={() => handleImageError(product.id)}
                      className="w-full h-64 md:h-full object-cover object-center"
                    />
                  ) : (
                    <div className="bg-gray-100 h-64 md:h-full flex items-center justify-center text-gray-400">
                      <div className="text-center p-4">
                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-2 text-sm">Image not available</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Product Details */}
                <div className="p-6 flex-1">
                  <div className="flex flex-col h-full">
                    <div>
                      <h3 className="text-2xl font-medium text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-custom-purple font-medium text-lg mb-4">From ${product.variants[0]?.price || 'N/A'}</p>
                      <p className="text-gray-600 mb-6">{product.description}</p>
                    </div>
                    
                    {/* Variants */}
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Available Lengths:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {product.variants && product.variants.length > 0 ? (
                          product.variants.map((variant, index) => (
                            <div key={`${product.id}-${index}`} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">{variant.length}</div>
                                <div className="text-sm text-gray-500">${variant.price} each</div>
                              </div>
                              <button
                                onClick={() => handleAddToCart(product, variant)}
                                className="ml-4 px-4 py-2 bg-custom-purple text-white text-sm font-medium rounded-md hover:bg-opacity-90 transition-colors whitespace-nowrap"
                              >
                                Add to Cart
                              </button>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">No variants available</p>
                        )}
                      </div>
                    </div>
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

export default Products;
