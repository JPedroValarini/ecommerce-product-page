import { useLocalStorage } from '../../hooks/useLocalStorage';
import VariantSelector from './VariantSelector';
import DeliveryCalculator from './DeliveryCalculator';

const ProductInfo = ({ product }) => {
  const [selectedColor, setSelectedColor] = useLocalStorage(
    `product_${product.id}_color`, 
    product.colors[0]
  );
  
  const [selectedSize, setSelectedSize] = useLocalStorage(
    `product_${product.id}_size`, 
    product.sizes[0]
  );

  return (
    <div className="w-full md:w-3/5 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
      
      <div className="mb-4">
        <span className="text-3xl font-bold text-gray-900">
          {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
        {product.originalPrice && (
          <span className="ml-2 text-lg text-gray-500 line-through">
            {product.originalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        )}
      </div>
      
      <VariantSelector 
        variants={product.colors}
        selectedVariant={selectedColor}
        onVariantChange={setSelectedColor}
        label="Cor"
      />
      
      <VariantSelector 
        variants={product.sizes}
        selectedVariant={selectedSize}
        onVariantChange={setSelectedSize}
        label="Tamanho"
      />
      
      <div className="mt-6">
        <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors">
          Adicionar ao Carrinho
        </button>
      </div>
      
      <DeliveryCalculator />
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium mb-2">Descrição do Produto</h3>
        <p className="text-gray-600">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;