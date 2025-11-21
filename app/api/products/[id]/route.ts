import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';


export async function GET(req: Request, { params }: any) {
const docRef = doc(db, 'products', params.id);
const docSnap = await getDoc(docRef);
if (!docSnap.exists()) return NextResponse.json({ error: 'No existe' }, { status: 404 });
return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
}


export async function PUT(req: Request, { params }: any) {
const data = await req.json();
const docRef = doc(db, 'products', params.id);
await updateDoc(docRef, data);
return NextResponse.json({ message: 'Producto actualizado' });
}


export async function DELETE(req: Request, { params }: any) {
const docRef = doc(db, 'products', params.id);
await deleteDoc(docRef);
return NextResponse.json({ message: 'Producto eliminado' });
}