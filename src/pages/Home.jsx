import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaTiktok } from 'react-icons/fa';

const Home = () => {
  const [isPortrait, setIsPortrait] = useState(window.innerWidth < window.innerHeight);
  const [hasPortraitImage, setHasPortraitImage] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerWidth < window.innerHeight);
    };

    // Check if portrait image exists
    const img = new Image();
    img.onload = () => setHasPortraitImage(true);
    img.onerror = () => setHasPortraitImage(false);
    img.src = '/images/background-portrait.jpeg';

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    pauseOnHover: false,
    arrows: false
  };

  const backgroundImages = [
    '/images/background.jpeg',
    '/images/background1.jpeg',
    '/images/background2.jpeg',
  ];

  // Fallback to first carousel image if portrait image is not available
  const portraitImage = hasPortraitImage ? '/images/background-portrait.jpeg' : backgroundImages[0];

  return (
    <div className="min-h-screen w-full">
      {/* Background - Conditional Rendering */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-black">
        {isPortrait ? (
          // Single image for portrait
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${portraitImage})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        ) : (
          // Carousel for landscape
          <Slider {...carouselSettings}>
            {backgroundImages.map((image, index) => (
              <div key={index} className="w-full h-screen">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${image})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
      
      {/* Shop Now Button */}
      <div className="fixed bottom-[calc(5rem+30px)] left-0 right-0 flex justify-center">
        <Link 
          to="/products"
          className="bg-black/30 backdrop-blur-sm text-white hover:text-gray-200 font-semibold py-4 px-8 sm:px-32 text-center rounded-full text-base sm:text-xl md:text-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 border-2 border-white/30 hover:border-white/50 w-auto sm:min-w-[480px]"
          aria-label="Shop our collection of luxury hair products"
        >
          Shop Now
        </Link>
      </div>

      {/* TikTok Button */}
      <a 
        href="https://www.tiktok.com/@voilaviolet6" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-black/40 transition-all duration-300 z-50 border-2 border-white/30 hover:border-white/50 flex items-center space-x-2 group"
        aria-label="Follow us on TikTok @voilaviolet6"
      >
        <FaTiktok className="w-5 h-5 group-hover:text-pink-500 transition-colors" />
        <span className="font-medium hidden sm:inline-block">TikTok</span>
      </a>
    </div>
  );
};

export default Home;