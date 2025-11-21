'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";

function ProductCard({ product, onDelete }: any) {
  return (
    <div className="border p-4 rounded flex justify-between items-center bg-white text-black shadow">
      <div className="flex gap-4 items-center">
        {product.imageURL && (
          <img src={product.imageURL} alt={product.name} className="w-20 h-20 object-cover rounded" />
        )}
        <div>
          <p className="font-bold">{product.name}</p>
          <p>${product.price}</p>
          <p>Stock: {product.stock}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          href={`/edit/${product.id}`}
          className="bg-gradient-to-br from-gray-200 to-gray-700 text-white px-2 py-1 rounded shadow hover:opacity-90 transition"
        >
          Editar
        </Link>

        <button
          onClick={() => onDelete(product.id)}
          className="bg-gradient-to-br from-red-300 to-red-700 text-white px-2 py-1 rounded shadow hover:opacity-90 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default function PanelPage() {
  const { user, isAdminUser, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Protección de ruta
  useEffect(() => {
    if (!loading) {
      if (!user || !isAdminUser) {
        router.push("/admin/login");
      }
    }
  }, [loading, user, isAdminUser, router]);

  // Cargar productos
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items: any[] = [];
      querySnapshot.forEach(docSnap => {
        items.push({ id: docSnap.id, ...docSnap.data() });
      });
      setProducts(items);
      setLoadingProducts(false);
    };

    if (!loading && user && isAdminUser) {
      fetchProducts();
    }
  }, [loading, user, isAdminUser]);

  if (loading || loadingProducts) {
    return <p className="p-6">Cargando panel...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <p className="mb-4">Bienvenido, {user?.email}</p>

      <div className="flex flex-col gap-4 mb-6">
        <Link
          href="/create"
          className="bg-gradient-to-br from-gray-200 to-gray-800 text-white px-3 py-2 rounded shadow hover:opacity-90 transition"
        >
          Crear Producto
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Productos</h2>
      <div className="flex flex-col gap-4">
        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          products.map(product => (
            <ProductCard key={product.id} product={product} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );

  async function handleDelete(id: string) {
    if (confirm("¿Deseas eliminar este producto?")) {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter(p => p.id !== id));
    }
  }
}
