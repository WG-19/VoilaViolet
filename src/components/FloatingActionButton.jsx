import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingActionButton = ({
  icon: Icon = FaWhatsapp,
  onClick,
  href,
  target = '_blank',
  rel = 'noopener noreferrer',
  label = 'WhatsApp',
  position = 'bottom-8 right-8',
  className = '',
  iconClass = 'group-hover:text-green-500 transition-colors',
  showLabel = true
}) => {
  const buttonClasses = `fixed ${position} bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-black/40 transition-all duration-300 z-50 border-2 border-white/30 hover:border-white/50 flex items-center space-x-2 group ${className}`;
  
  const content = (
    <>
      <Icon className={`w-5 h-5 ${iconClass}`} />
      {showLabel && <span className="font-medium hidden sm:inline-block">{label}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
        aria-label={label}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      aria-label={label}
    >
      {content}
    </button>
  );
};

export default FloatingActionButton;
