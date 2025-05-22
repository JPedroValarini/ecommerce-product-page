const VariantSelector = ({ variants, selectedVariant, onVariantChange, label }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onVariantChange(variant)}
            className={`px-4 py-2 rounded-md border ${selectedVariant.id === variant.id ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-800 border-gray-300'}`}
          >
            {variant.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;