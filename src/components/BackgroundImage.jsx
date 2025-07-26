import React from 'react';

const BackgroundImage = ({ children, imageUrl = '/images/background4.jpeg', overlay = true }) => {
  return (
    <div className="fixed inset-0 -z-10">
      <img 
        src={imageUrl} 
        alt="Background" 
        className="w-full h-full object-cover"
      />
      {overlay && <div className="absolute inset-0 bg-black/50"></div>}
      {children}
    </div>
  );
};

export default BackgroundImage;
