'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    console.log("➡ INICIANDO LOGIN...");

    try {
      setError("");

      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      console.log("✔ USER AUTH:", user.uid);

      const userDocRef = doc(db, "users", user.uid);
      const snap = await getDoc(userDocRef);

      console.log("✔ Existe documento:", snap.exists());

      if (!snap.exists()) {
        setError("No tienes permisos de administrador");
        return;
      }

      const data = snap.data();
      console.log("📝 Datos Firestore:", data);

      if (data.role !== "admin") {
        setError("No tienes permisos");
        return;
      }

      console.log("✔ ES ADMIN — REDIRIGIENDO A /admin/panel...");
      router.push("/admin/panel");

    } catch (err) {
      console.log("🔥 ERROR:", err);
      setError("Error al iniciar sesión");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Login Admin</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-gradient-to-br from-gray-200 to-gray-800 text-white py-2 rounded shadow hover:opacity-90 transition"
      >
        Iniciar sesión
      </button>
    </div>
  );
}
