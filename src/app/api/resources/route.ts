import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/auth';
import { portfolioData, Resource } from '@/lib/data';

// GET - Obtener todos los recursos
export async function GET() {
  try {
    const resources = await portfolioData.getResources();
    return NextResponse.json(resources);
  } catch (error) {
    console.error('Error al obtener recursos:', error);
    return NextResponse.json(
      { error: 'Error al cargar recursos' },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo recurso
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

    // Procesar los datos recibidos
    const resourceData = await request.json();
    
    // Validación básica
    if (!resourceData.title || !resourceData.category || !resourceData.level || !resourceData.format) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      );
    }

    // Crear el recurso
    const newResource = await portfolioData.addResource(resourceData);
    
    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    console.error('Error al crear recurso:', error);
    return NextResponse.json(
      { error: 'Error al crear recurso' },
      { status: 500 }
    );
  }
}
