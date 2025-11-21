import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: any;
  onDelete?: (id: string) => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  const { isAdminUser } = useAuth(); // <-- usamos isAdminUser
  const { addToCart } = useCart();

  return (
    <div className="p-4 border rounded-lg shadow-md flex flex-col gap-2">
      {product.imageURL && (
        <img
          src={product.imageURL}
          alt={product.name}
          className="w-full h-40 object-cover rounded-md"
        />
      )}
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="font-semibold">Precio: ${product.price}</p>
      <p className="text-sm">Stock: {product.stock}</p>

      <div className="flex gap-2 mt-2">
        {isAdminUser ? (
          <>
            <Link
              href={`/edit/${product.id}`}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Editar
            </Link>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => onDelete && onDelete(product.id)}
            >
              Eliminar
            </button>
          </>
        ) : (
          <button
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                stock: product.stock,
                imageURL: product.imageURL,
                quantity: 1,
              })
            }
          >
            Añadir al carrito
          </button>
        )}
      </div>
    </div>
  );
}
