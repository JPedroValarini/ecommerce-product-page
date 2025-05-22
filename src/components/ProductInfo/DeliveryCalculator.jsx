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
      setLoading(false);
    }
  };

  const formatCep = (value) => {
    return value.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
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
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Buscando...' : 'Calcular'}
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