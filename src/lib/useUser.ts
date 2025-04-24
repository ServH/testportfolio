import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import { User, defaultUser } from './auth';

/**
 * Custom hook para manejar el usuario en sesión y proteger rutas
 */
export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  // Fetch del usuario actual usando SWR para caché y revalidación
  const { data: user, mutate: mutateUser, error } = useSWR<User>('/api/user');

  // Si hay un error de fetch, consideramos al usuario como no autenticado
  const isLoading = !user && !error;
  const isLoggedIn = user?.isLoggedIn ?? false;

  useEffect(() => {
    // Si no se necesita redirección o los datos están cargando, no hacer nada
    if (!redirectTo || isLoading) return;

    // Si el usuario no está logueado y se requiere autenticación, redirigir
    if (
      // Si se requiere autenticación y el usuario no está logueado
      (!redirectIfFound && !isLoggedIn) ||
      // Si no se debe permitir al usuario autenticado y sí lo está
      (redirectIfFound && isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, isLoading, isLoggedIn]);

  return {
    user: isLoading ? defaultUser : user,
    mutateUser,
    isLoading,
    isLoggedIn,
  };
}
