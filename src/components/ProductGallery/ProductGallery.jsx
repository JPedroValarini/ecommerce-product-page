import { useState } from 'react';
import Thumbnail from './Thumbnail';

const ProductGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="w-full md:w-2/5 px-4">
      <div className="mb-4 rounded-lg overflow-hidden">
        <img 
          src={mainImage} 
          alt="Product" 
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {images.map((img, index) => (
          <Thumbnail 
            key={index}
            image={img}
            isActive={img === mainImage}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;