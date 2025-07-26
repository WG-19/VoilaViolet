import React from 'react';

const Card = ({ children, className = '', fullWidth = false, textColor = 'text-white' }) => {
  return (
    <div className={`bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg p-8 ${fullWidth ? 'w-full' : 'max-w-2xl w-full'} ${textColor} ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h1 className={`text-4xl font-bold text-custom-purple mb-2 text-center ${className}`}>
    {children}
  </h1>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-white text-center ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`space-y-4 text-white ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', border = true, textColor = 'text-white' }) => (
  <div className={`mt-8 pt-6 ${border ? 'border-t border-white/20' : ''} ${textColor} ${className}`}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
