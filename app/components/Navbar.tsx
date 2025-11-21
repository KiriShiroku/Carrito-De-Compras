'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { user, isAdminUser } = useAuth();
  const { cartItems } = useCart();
  const router = useRouter();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [loggedUser, setLoggedUser] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setLoggedUser(u?.email ?? null);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const adminLink = isAdminUser ? "/admin/panel" : "/admin/login";

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow">

      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        Mi Tienda
      </Link>

      <div className="flex items-center gap-4">

        {/* Botón ADMIN (siempre visible) */}
        <Link
          href={adminLink}
          className="bg-gradient-to-br from-gray-200 to-gray-800 text-white px-3 py-1 rounded shadow hover:opacity-90 transition"
        >
          Admin
        </Link>

        {/* Carrito */}
        <Link
          href="/cart"
          className="bg-gradient-to-br from-gray-200 to-gray-800 text-white px-3 py-1 rounded shadow hover:opacity-90 transition"
        >
          Carrito ({totalItems})
        </Link>

        {/* Usuario logueado */}
        {loggedUser && (
          <>
            <span className="text-sm opacity-80">{loggedUser}</span>

            {/* Cerrar sesión */}
            <button
              onClick={handleLogout}
              className="bg-gradient-to-br from-gray-200 to-gray-800 text-white px-3 py-1 rounded shadow hover:opacity-90 transition"
            >
              Salir
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
