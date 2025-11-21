'use client';  // <- ESTA LÍNEA ES OBLIGATORIA

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ProductForm from "../../components/ProductForm";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const ref = doc(db, "products", id as string);
      const snap = await getDoc(ref);
      setFormData(snap.data());
    };
    load();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await updateDoc(doc(db, "products", id as string), formData);
    router.push("/");
  };

  if (!formData) return <p className="p-6">Cargando...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar producto</h1>
      <ProductForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
    </div>
  );
}
