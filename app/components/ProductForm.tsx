export default function ProductForm({ formData, setFormData, onSubmit }: any) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Nombre"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="border p-2 rounded"
        required
      />

      <textarea
        placeholder="Descripción"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="border p-2 rounded"
      ></textarea>

      <input
        type="number"
        placeholder="Precio"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
        className="border p-2 rounded"
        required
      />

      <input
        type="number"
        placeholder="Stock"
        value={formData.stock}
        onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
        className="border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="URL de imagen"
        value={formData.imageURL}
        onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
        className="border p-2 rounded"
        required
      />

      <button type="submit" className="bg-green-600 text-black p-2 rounded">
        Guardar
      </button>
    </form>
  );
}
