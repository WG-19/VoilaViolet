import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { useLocation } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'

// Track page views when the route changes
function PageViewTracker() {
  const location = useLocation();
  
  useEffect(() => {
    // Send pageview to Google Analytics
    window.gtag('config', 'G-0GX0455CN6', {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App>
        <PageViewTracker />
      </App>
    </CartProvider>
  </StrictMode>,
)
