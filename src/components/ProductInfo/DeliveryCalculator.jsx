import { useState } from 'react';
import axios from 'axios';
import { FiTruck, FiMapPin, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const DeliveryCalculator = () => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCepChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCep(value);
  };

  const fetchAddress = async () => {
    if (cep.length !== 8) {
      setError('CEP deve ter 8 dígitos');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setError('CEP não encontrado');
        setAddress(null);
      } else {
        setAddress(response.data);
        setError(null);
      }
    } catch (err) {
      setError('Erro ao buscar CEP');
      setAddress(null);
    } finally {
      await new Promise(r => setTimeout(r, 800));
      setLoading(false);
    }
  };

  const formatCep = (value) => {
    return value.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg relative min-h-[200px]">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-10 rounded-lg transition-opacity duration-300 ease-in-out">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 border-4 border-t-blue-500 border-r-blue-400 border-b-blue-300 border-l-blue-200 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-t-transparent border-r-transparent border-b-transparent border-l-transparent rounded-full"></div>
          </div>
          <p className="text-blue-600 font-medium animate-pulse">Calculando frete...</p>
        </div>
      )}

      <h3 className="text-lg font-medium mb-3 flex items-center">
        <FiTruck className="mr-2" /> Calcular frete e prazo de entrega
      </h3>

      <div className="flex">
        <input
          type="text"
          value={formatCep(cep)}
          onChange={handleCepChange}
          placeholder="Digite seu CEP"
          maxLength={9}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={fetchAddress}
          disabled={loading || cep.length !== 8}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 disabled:bg-blue-300 flex items-center justify-center transition-colors duration-200"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          ) : (
            'Calcular'
          )}
        </button>
      </div>

      {error && (
        <div className="mt-2 text-red-500 flex items-center">
          <FiXCircle className="mr-1" /> {error}
        </div>
      )}

      {address && (
        <div className="mt-4 p-3 bg-white rounded-md border border-green-200">
          <div className="flex items-center text-green-600 mb-2">
            <FiCheckCircle className="mr-2" />
            <span>Frete disponível para este endereço</span>
          </div>

          <div className="flex items-start mt-2">
            <FiMapPin className="mr-2 mt-1 text-gray-500" />
            <div>
              <p>{address.logradouro}, {address.bairro}</p>
              <p>{address.localidade} - {address.uf}</p>
              <p className="text-sm text-gray-500">CEP: {formatCep(address.cep)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryCalculator;