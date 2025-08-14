import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart: cartItems, updateQuantity, removeItem } = useCart();
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [deliveryArea, setDeliveryArea] = useState('cbd');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Calculate delivery fee
  const getDeliveryFee = () => {
    if (deliveryOption === 'pickup') return 0;
    return deliveryArea === 'cbd' ? 3 : 5; // $3 for CBD, $5 base for out of CBD
  };
  
  const deliveryFee = getDeliveryFee();
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!customerName || !customerPhone || !deliveryDate || (deliveryOption === 'delivery' && !deliveryAddress)) {
      alert('Please fill in all required fields');
      return;
    }

    // Format order details
    const orderDetails = cartItems.map(item => 
      `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const deliveryInfo = deliveryOption === 'delivery' 
      ? `*Delivery Address:* ${deliveryAddress}\n*Delivery Area:* ${deliveryArea === 'cbd' ? 'Harare CBD ($3)' : 'Out of CBD ($5)'}`
      : '*Pickup*';

    // Create WhatsApp message
    const message = `*New Order from Voila Violet*\n\n` +
      `*Customer Name:* ${customerName}\n` +
      `*Phone:* ${customerPhone}\n` +
      `*Order Type:* ${deliveryOption === 'delivery' ? 'Delivery' : 'Pickup'}\n` +
      `${deliveryInfo}\n\n` +
      `*Order Details:*\n${orderDetails}\n\n` +
      `*Subtotal:* $${subtotal.toFixed(2)}\n` +
      `*Delivery Fee:* $${deliveryFee.toFixed(2)}\n` +
      `*Total:* $${total.toFixed(2)}\n\n` +
      `*Requested ${deliveryOption === 'delivery' ? 'Delivery' : 'Pickup'} Date:* ${deliveryDate}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp business number (with country code, no + or spaces)
    const whatsappNumber = '263777978762';
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Your</span>
            <span className="block text-custom-purple font-medium">Shopping Cart</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Review and manage your selected items
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {cartItems.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {/* Cart Items */}
              <div className="px-4 py-5 sm:p-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full sm:w-24 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6"
                    />
                    <div className="flex-1 w-full">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="text-custom-purple font-medium">${item.price.toFixed(2)}</p>
                      
                      <div className="mt-2 flex items-center">
                        <span className="mr-4 text-sm text-gray-500">Quantity:</span>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-white hover:text-custom-purple transition-colors"
                          >
                            <i className="las la-minus"></i>
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-white hover:text-custom-purple transition-colors"
                          >
                            <i className="las la-plus"></i>
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="ml-auto px-3 py-1.5 sm:py-1 rounded-md border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors flex items-center justify-center"
                          aria-label="Remove item"
                        >
                          <i className="las la-trash text-sm sm:text-base"></i>
                          <span className="ml-1.5 text-sm sm:text-base">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Options */}
              <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Delivery Options</h2>
                
                {/* Delivery Method Toggle */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Method <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setDeliveryOption('delivery')}
                      className={`p-4 border rounded-lg text-left ${deliveryOption === 'delivery' ? 'border-custom-purple bg-white' : 'border-gray-200 bg-white'}`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${deliveryOption === 'delivery' ? 'border-custom-purple' : 'border-gray-400'}`}>
                          {deliveryOption === 'delivery' && <div className="w-3 h-3 rounded-full bg-custom-purple"></div>}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Delivery</h3>
                          <p className="text-sm text-gray-600">Get it delivered to your location</p>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setDeliveryOption('pickup')}
                      className={`p-4 border rounded-lg text-left ${deliveryOption === 'pickup' ? 'border-custom-purple bg-white' : 'border-gray-200 bg-white'}`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${deliveryOption === 'pickup' ? 'border-custom-purple' : 'border-gray-400'}`}>
                          {deliveryOption === 'pickup' && <div className="w-3 h-3 rounded-full bg-custom-purple"></div>}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Pickup</h3>
                          <p className="text-sm text-gray-600">Pick up from our location</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Delivery Area (only for delivery) */}
                {deliveryOption === 'delivery' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Area <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setDeliveryArea('cbd')}
                        className={`p-4 border rounded-lg text-left ${deliveryArea === 'cbd' ? 'border-custom-purple bg-white' : 'border-gray-200 bg-white'}`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${deliveryArea === 'cbd' ? 'border-custom-purple' : 'border-gray-400'}`}>
                            {deliveryArea === 'cbd' && <div className="w-3 h-3 rounded-full bg-custom-purple"></div>}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">Harare CBD</h3>
                            <p className="text-sm text-gray-600">$3 delivery fee</p>
                          </div>
                        </div>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setDeliveryArea('out-cbd')}
                        className={`p-4 border rounded-lg text-left ${deliveryArea === 'out-cbd' ? 'border-custom-purple bg-white' : 'border-gray-200 bg-white'}`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${deliveryArea === 'out-cbd' ? 'border-custom-purple' : 'border-gray-400'}`}>
                            {deliveryArea === 'out-cbd' && <div className="w-3 h-3 rounded-full bg-custom-purple"></div>}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">Out of Harare CBD</h3>
                            <p className="text-sm text-gray-600">$5 delivery fee</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Delivery Address (only for delivery) */}
                {deliveryOption === 'delivery' && (
                  <div className="mb-6">
                    <label htmlFor="delivery-address" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="delivery-address"
                      rows="3"
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm shadow-gray-200 focus:border-custom-purple focus:ring-custom-purple sm:text-sm bg-white text-gray-900"
                      placeholder="Enter your full delivery address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      required
                    />
                    {deliveryArea === 'out-cbd' && (
                      <p className="mt-1 text-sm text-gray-500">
                        We'll contact you to confirm the exact delivery fee based on your location.
                      </p>
                    )}
                  </div>
                )}

                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="customer-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="customer-name"
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm shadow-gray-200 focus:border-custom-purple focus:ring-custom-purple sm:text-sm bg-white text-gray-900"
                      placeholder="Your full name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="customer-phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="customer-phone"
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm shadow-gray-200 focus:border-custom-purple focus:ring-custom-purple sm:text-sm bg-white text-gray-900"
                      placeholder="Your phone number"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Delivery/Pickup Date */}
                <div>
                  <label htmlFor="delivery-date" className="block text-sm font-medium text-gray-700 mb-1">
                    {deliveryOption === 'delivery' ? 'Preferred Delivery Date' : 'Preferred Pickup Date'} 
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="delivery-date"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm shadow-gray-200 focus:border-custom-purple focus:ring-custom-purple sm:text-sm bg-white text-gray-900"
                    min={new Date().toISOString().split('T')[0]}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="text-gray-900">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 my-3"></div>
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span className="text-custom-purple">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <button 
                    onClick={handlePlaceOrder}
                    className="w-full bg-custom-purple hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-md transition-colors"
                  >
                    Place Order
                  </button>
                  <Link 
                    to="/products" 
                    className="block text-center text-custom-purple hover:text-opacity-80 font-medium"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-4 py-12 text-center">
              <i className="las la-shopping-cart text-5xl text-gray-300 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Looks like you haven't added any products yet.</p>
              <Link 
                to="/products" 
                className="inline-block bg-custom-purple hover:bg-opacity-90 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
