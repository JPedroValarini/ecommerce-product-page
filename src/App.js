import { useState } from 'react';
import Main from './components/Main';

const App = () => {
  const [product] = useState({
    id: 1,
    name: 'Tênis Nike Court Vision Low',
    description: 'O Nike Court Vision Low traz o estilo clássico do basquete dos anos 80 com um toque moderno. Confortável, durável e versátil, é ideal para o dia a dia com visual urbano e autêntico.',
    price: 399.99,
    originalPrice: 499.99,
    images: [
      'https://imgnike-a.akamaihd.net/768x768/058760IDA1.jpg',
      'https://imgnike-a.akamaihd.net/360x360/058760IDA2.jpg',
      'https://imgnike-a.akamaihd.net/360x360/058760IDA3.jpg',
      'https://imgnike-a.akamaihd.net/360x360/058760IDA4.jpg',
      'https://imgnike-a.akamaihd.net/360x360/058760IDA5.jpg',
    ],
    colors: [
      { id: 1, name: 'Branco/Preto', colorClass: 'bg-white border-black-500' },
      { id: 2, name: 'Preto/Cinza', colorClass: 'bg-gray-900 border-gray-500' },
      { id: 3, name: 'Azul Marinho', colorClass: 'bg-blue-900 border-blue-700' },
    ],
    sizes: [
      { id: 2, name: '38' },
      { id: 3, name: '40' },
      { id: 4, name: '42' },
      { id: 5, name: '44' },
      { id: 6, name: '46' },
    ],
  });

  return (
    <div className="min-h-screen bg-white">
      <Main product={product} />
    </div>
  );
};

export default App;