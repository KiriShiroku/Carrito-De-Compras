import { NextResponse } from 'next/server';
import { db } from '../../lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';


export async function GET() {
const querySnapshot = await getDocs(collection(db, 'products'));
const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
return NextResponse.json(products);
}


export async function POST(req: Request) {
const data = await req.json();
await addDoc(collection(db, 'products'), data);
return NextResponse.json({ message: 'Producto creado' });
}