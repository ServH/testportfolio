import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, defaultUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getIronSession(cookies(), sessionOptions);
    
    // Cerrar la sesión estableciendo los valores predeterminados
    session.user = defaultUser;
    
    // Guardar la sesión para actualizar la cookie
    await session.save();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error en logout:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
