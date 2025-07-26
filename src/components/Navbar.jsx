import { Link } from 'react-router-dom';
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();

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
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                <i className="las la-home mr-1.5 text-lg"></i>
                <span>Home</span>
              </Link>
              <Link to="/products" className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                <i className="las la-shopping-bag mr-1.5 text-lg"></i>
                <span>Products</span>
              </Link>
              <Link to="/about" className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                <i className="las la-info-circle mr-1.5 text-lg"></i>
                <span>About</span>
              </Link>
              <Link to="/contact" className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                <i className="las la-envelope mr-1.5 text-lg"></i>
                <span>Contact</span>
              </Link>
            </div>

            {/* Cart */}
            <div className="flex items-center">
              <Link to="/cart" className="text-white hover:text-gray-200 p-2 transition-colors relative">
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
              <button className="text-white hover:text-gray-200 p-2">
                <i className="las la-bars text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
