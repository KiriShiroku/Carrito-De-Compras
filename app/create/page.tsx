'use client';

import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import ProductForm from "../components/ProductForm";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    stock: 0,
    imageURL: "",
    description: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await addDoc(collection(db, "products"), formData);
    router.push("/");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
