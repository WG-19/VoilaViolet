const PlaceholderImage = ({ className = '', text = 'Image' }) => {
  return (
    <div className={`bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center ${className}`}>
      <span className="text-violet-400 font-medium">{text}</span>
    </div>
  );
};

export default PlaceholderImage;
