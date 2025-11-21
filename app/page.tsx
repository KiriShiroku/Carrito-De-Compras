'use client';
import { useEffect, useState } from 'react';
import { db } from './lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useCart } from './context/CartContext';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, 'products'));
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Catálogo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(p => (
          <div key={p.id} className="p-4 border rounded">
            <h2 className="font-bold">{p.name}</h2>
            <p>{p.description}</p>
            <p>Precio: ${p.price}</p>
            <button
              onClick={() => addToCart({ ...p, quantity: 1 })}
              className="mt-2 px-3 py-1 bg-green-500 text-black"
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
