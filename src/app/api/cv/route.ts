import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/auth';
import { portfolioData } from '@/lib/data';

// GET - Obtener los datos del CV
export async function GET() {
  try {
    const cvData = await portfolioData.getCV();
    return NextResponse.json(cvData);
  } catch (error) {
    console.error('Error al obtener datos del CV:', error);
    return NextResponse.json(
      { error: 'Error al cargar datos del CV' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar los datos del CV
export async function PUT(request: NextRequest) {
  try {
    // Verificar autenticación
    const session = await getIronSession(cookies(), sessionOptions);
    if (!session.user?.isLoggedIn) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Procesar los datos recibidos
    const cvData = await request.json();
    
    // Validación básica (se podría expandir según necesidades)
    if (!cvData || !cvData.personal || !cvData.personal.name) {
      return NextResponse.json(
        { error: 'Datos inválidos' },
        { status: 400 }
      );
    }

    // Guardar los datos
    const updatedCV = await portfolioData.saveCV(cvData);
    
    return NextResponse.json(updatedCV);
  } catch (error) {
    console.error('Error al actualizar datos del CV:', error);
    return NextResponse.json(
      { error: 'Error al guardar datos del CV' },
      { status: 500 }
    );
  }
}
