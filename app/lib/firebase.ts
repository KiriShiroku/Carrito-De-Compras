// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (de tu proyecto)
const firebaseConfig = {
  apiKey: "AIzaSyAu9P-goMQhfRBJpWXQUnKQEh-LugA5qLw",
  authDomain: "carrito-compras-6d0c2.firebaseapp.com",
  projectId: "carrito-compras-6d0c2",
  storageBucket: "carrito-compras-6d0c2.appspot.com",
  messagingSenderId: "634755796066",
  appId: "1:634755796066:web:671e5c9fe38d999bd0d53b",
};

// Evita inicializar Firebase más de una vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Exportamos Firestore
export const db = getFirestore(app);

// Exportamos Auth
export const auth = getAuth(app);
