import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, verifyCredentials } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getIronSession(cookies(), sessionOptions);
    const { username, password } = await request.json();

    console.log('Intentando login con:', username); // Log para debug

    // Validación básica de entrada
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Verificar credenciales
    const isValid = await verifyCredentials(username, password);
    console.log('Credenciales válidas:', isValid); // Log para debug
    
    if (!isValid) {
      return NextResponse.json(
        { message: 'Usuario o contraseña incorrectos' },
        { status: 401 }
      );
    }

    // Establecer datos de sesión
    session.user = {
      isLoggedIn: true,
      username,
    };

    // Guardar sesión
    await session.save();
    console.log('Sesión guardada para:', username); // Log para debug

    return NextResponse.json({ 
      user: { isLoggedIn: true, username } 
    });
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}