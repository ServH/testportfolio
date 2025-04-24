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
// Password hasheado para seguridad (este es el hash de 'admin123')
const ADMIN_PASSWORD_HASH = '$2a$10$fmLuJJM2OSuXGX3.XSUCzO1d8YIpE3RBHdrZ9C9mX2jtUGXCZoYTO';

/**
 * Verifica las credenciales del usuario
 */
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  // Comprueba si el usuario es el administrador
  if (username !== ADMIN_USERNAME) {
    return false;
  }
  
  // Compara el password proporcionado con el hash almacenado
  return await compare(password, ADMIN_PASSWORD_HASH);
}

/**
 * Genera un hash para un password (utilidad para generar passwords)
 */
export async function generatePasswordHash(password: string): Promise<string> {
  return await hash(password, 10);
}
