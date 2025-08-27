import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { api } from '../lib/api';

export default function Kurtis() {
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get('/api/products?category=Kurtis');
      setList(data);
    })();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Kurtis</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {list.map(p => <ProductCard key={p._id} p={p} />)}
      </div>
      <a href="https://wa.me/918125914279" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 bg-[#25D366] text-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg hover:bg-[#20BA5C] transition-colors z-50"
        >
          <i className="fab fa-whatsapp text-4xl"></i>
      </a>
    </div>
  );
}
