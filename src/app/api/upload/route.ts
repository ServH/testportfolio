import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/auth';
import uploadService from '@/lib/upload';

// POST - Subir un archivo
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getIronSession(cookies(), sessionOptions);
    if (!session.user?.isLoggedIn) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }
    
    // Obtener el tipo de archivo de los parámetros de la URL
    const { searchParams } = new URL(request.url);
    const fileType = searchParams.get('type') as 'document' | 'image' | 'profile';
    
    if (!fileType || !['document', 'image', 'profile'].includes(fileType)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no válido' },
        { status: 400 }
      );
    }
    
    // Procesar la subida del archivo
    const filePath = await uploadService.processFileUpload(request, fileType);
    
    return NextResponse.json({ filePath });
  } catch (error) {
    console.error('Error al subir archivo:', error);
    return NextResponse.json(
      { error: 'Error al procesar la subida de archivo' },
      { status: 500 }
    );
  }
}
