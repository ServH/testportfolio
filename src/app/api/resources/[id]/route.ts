import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/auth';
import { portfolioData } from '@/lib/data';

// GET - Obtener un recurso específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const resources = await portfolioData.getResources();
    const resource = resources.find(r => r.id === id);
    
    if (!resource) {
      return NextResponse.json(
        { error: 'Recurso no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(resource);
  } catch (error) {
    console.error('Error al obtener recurso:', error);
    return NextResponse.json(
      { error: 'Error al cargar recurso' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un recurso
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación
    const session = await getIronSession(cookies(), sessionOptions);
    if (!session.user?.isLoggedIn) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { id } = params;
    const updateData = await request.json();
    
    // Actualizar el recurso
    const updatedResource = await portfolioData.updateResource(id, updateData);
    
    if (!updatedResource) {
      return NextResponse.json(
        { error: 'Recurso no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedResource);
  } catch (error) {
    console.error('Error al actualizar recurso:', error);
    return NextResponse.json(
      { error: 'Error al actualizar recurso' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un recurso
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar autenticación
    const session = await getIronSession(cookies(), sessionOptions);
    if (!session.user?.isLoggedIn) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { id } = params;
    
    // Eliminar el recurso
    const success = await portfolioData.deleteResource(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Recurso no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar recurso:', error);
    return NextResponse.json(
      { error: 'Error al eliminar recurso' },
      { status: 500 }
    );
  }
}
