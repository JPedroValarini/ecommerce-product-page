const Thumbnail = ({ image, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-16 h-16 rounded-md overflow-hidden border-2 ${isActive ? 'border-blue-500' : 'border-transparent'}`}
    >
      <img 
        src={image} 
        alt="Thumbnail" 
        className="w-full h-full object-cover"
      />
    </button>
  );
};

export default Thumbnail;