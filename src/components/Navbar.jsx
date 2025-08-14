import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // Close menu when clicking outside or navigating
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const navLinks = [
    { to: "/", icon: "la-home", text: "Home" },
    { to: "/products", icon: "la-shopping-bag", text: "Products" },
    { to: "/about", icon: "la-info-circle", text: "About" },
    { to: "/contact", icon: "la-envelope", text: "Contact" },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-black/30 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left side */}
          <Link to="/" className="flex items-center group">
            <img 
              src="/images/Logo.jpeg" 
              alt="Luxury Hair Logo" 
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl text-white font-medium group-hover:text-gray-200 transition-colors">
              Luxury Hair
            </span>
          </Link>

          {/* Navigation and Cart - Right side */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                >
                  <i className={`las ${link.icon} mr-1.5 text-lg`}></i>
                  <span>{link.text}</span>
                </Link>
              ))}
            </div>

            {/* Cart */}
            <div className="flex items-center">
              <Link 
                to="/cart" 
                className="text-white hover:text-gray-200 p-2 transition-colors relative"
                aria-label="Shopping Cart"
              >
                <i className="las la-shopping-cart text-xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-custom-purple text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleMenu}
                className="text-white hover:text-gray-200 p-2 focus:outline-none"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                onMouseDown={e => e.stopPropagation()}
              >
                <i className={`las ${isOpen ? 'la-times' : 'la-bars'} text-2xl transition-transform duration-300`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        ref={menuRef}
        className={`md:hidden bg-black/95 backdrop-blur-md fixed top-16 left-0 w-full overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-2 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center px-4 py-3 text-white hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <i className={`las ${link.icon} mr-3 text-xl w-6 text-center`}></i>
              <span className="text-base font-medium">{link.text}</span>
            </Link>
          ))}
          <div className="border-t border-white/10 my-2"></div>
          <Link
            to="/cart"
            className="flex items-center px-4 py-3 text-white hover:bg-white/10 rounded-md transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <i className="las la-shopping-cart mr-3 text-xl w-6 text-center"></i>
            <span className="text-base font-medium">
              Cart {cartCount > 0 && `(${cartCount})`}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
