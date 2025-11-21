'use client';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, cartTotal, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-black">Carrito</h1>

      {cartItems.length === 0 ? (
        <p className="text-black">
          Tu carrito está vacío.{" "}
          <Link className="text-blue-500" href="/">Ir al catálogo</Link>
        </p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="border p-4 rounded flex gap-4 items-center bg-white shadow text-black"
            >
              <img
                src={item.imageURL}
                className="w-20 h-20 object-cover rounded"
                alt={item.name}
              />

              <div className="flex-1">
                <p className="font-semibold text-black">{item.name}</p>
                <p className="text-black">${item.price}</p>
                <p className="text-black">Stock: {item.stock}</p>

                <input
                  type="number"
                  min={1}
                  max={item.stock}
                  value={item.quantity}
                  onChange={e => updateQuantity(item.id, Number(e.target.value))}
                  className="border border-gray-400 text-black bg-white px-2 py-1 w-20 mt-2 rounded"
                />
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 font-bold"
              >
                X
              </button>
            </div>
          ))}

          <div className="text-right font-bold mt-4 text-black">
            Total: ${cartTotal}
          </div>

          <div className="flex gap-2 mt-4">
            {/* Botón que combina con el degradado */}
            <button
              onClick={clearCart}
              className="bg-gradient-to-br from-gray-300 to-gray-700 text-white px-3 py-1 rounded shadow hover:opacity-90 transition"
            >
              Vaciar carrito
            </button>

            {/* Botón principal */}
            <button
              className="bg-gradient-to-br from-gray-200 to-gray-800 text-white px-3 py-1 rounded shadow hover:opacity-90 transition"
            >
              Confirmar pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
