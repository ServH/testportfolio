'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useUser from '@/lib/useUser';
import { User } from '@/lib/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isLoading } = useUser({
    redirectTo: '/admin/login',
    redirectIfFound: false,
  });
  
  // No renderizar nada mientras carga para evitar parpadeo
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }
  
  // Si estamos en la página de login, mostrar solo el contenido sin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  // Verificar si el usuario está autenticado
  if (!user?.isLoggedIn) {
    return <div className="min-h-screen flex items-center justify-center">Redirigiendo...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminNavbar user={user} />
      
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}

function AdminNavbar({ user }: { user: User }) {
  const pathname = usePathname();
  
  const handleLogout = async () => {
    await fetch('/api/auth/logout');
    window.location.href = '/admin/login';
  };
  
  const navItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Curriculum', href: '/admin/cv' },
    { name: 'Recursos', href: '/admin/recursos' },
  ];
  
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/admin" className="text-lg font-bold text-primary-600">
                Admin Panel
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === item.href
                      ? 'border-primary-500 text-gray-900 dark:text-white'
                      : 'border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div className="flex items-center">
                <span className="text-sm text-gray-500 dark:text-gray-300 mr-4">
                  {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-white dark:bg-gray-800 py-1 px-3 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Botón de menú móvil */}
            <button className="bg-white dark:bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-200 hover:text-gray-500 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <span className="sr-only">Abrir menú</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú móvil (simplificado) */}
      <div className="sm:hidden hidden">
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === item.href
                  ? 'border-primary-500 text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
