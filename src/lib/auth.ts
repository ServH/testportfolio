import { compare, hash } from 'bcryptjs';
import { IronSessionOptions } from 'iron-session';

// Tipo para el usuario de la sesión
export type User = {
  isLoggedIn: boolean;
  username: string;
};

// Datos predeterminados cuando no hay sesión
export const defaultUser: User = {
  isLoggedIn: false,
  username: '',
};

// Opciones de configuración para iron-session
export const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_PASSWORD || 'complex_password_at_least_32_characters_long',
  cookieName: 'portfolio-admin-session',
  cookieOptions: {
    // Opciones seguras para producción
    secure: process.env.NODE_ENV === 'production',
    // Opciones de seguridad recomendadas
    httpOnly: true,
    sameSite: 'strict',
  },
};

// Esta es la información del admin que está quemada en el código para simplificar
// En un entorno real, esto debería estar en una base de datos y el password hasheado
const ADMIN_USERNAME = 'admin';

// Para simplificar el proceso de desarrollo, permitiremos credenciales en texto plano
// En un entorno de producción, esto NUNCA debe hacerse - siempre usar hashes
const ADMIN_PASSWORD = 'admin123';

/**
 * Verifica las credenciales del usuario
 */
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  // Comprueba si el usuario es el administrador
  if (username !== ADMIN_USERNAME) {
    return false;
  }
  
  // Compara la contraseña directamente (solo para desarrollo)
  return password === ADMIN_PASSWORD;
}

/**
 * Genera un hash para un password (utilidad para generar passwords)
 */
export async function generatePasswordHash(password: string): Promise<string> {
  return await hash(password, 10);
}