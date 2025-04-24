import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, defaultUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getIronSession(cookies(), sessionOptions);
    
    // Utiliza los datos de la sesión si existen, o los valores predeterminados
    const user = session.user || defaultUser;
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
