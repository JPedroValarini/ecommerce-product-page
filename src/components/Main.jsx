import ProductGallery from './ProductGallery/ProductGallery';
import ProductInfo from './ProductInfo/ProductInfo';

const Main = ({ product }) => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>
    </main>
  );
};

export default Main;