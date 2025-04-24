'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { HomeIcon, DocumentTextIcon, PhotoIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  
  // Verificar si el usuario está autenticado
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/user');
        const data = await response.json();
        
        if (data.isLoggedIn) {
          setIsAuthenticated(true);
        } else {
          // Redirigir al login si no está autenticado
          router.push('/login');
        }
      } catch (error) {
        console.error('Error:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);
  
  // Manejar cierre de sesión
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout');
      router.push('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  
  // Mostrar un indicador de carga mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
        <span className="ml-3">Cargando...</span>
      </div>
    );
  }
  
  // Si no está autenticado, no mostrar nada (la redirección ya está en marcha)
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-800">
      {/* Sidebar para móvil */}
      <div className={`md:hidden fixed inset-0 flex z-40 transition-opacity ease-linear duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-900 transition ease-in-out duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:focus:ring-gray-500"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="sr-only">Cerrar sidebar</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <span className="text-xl font-bold text-gray-900 dark:text-white">Panel de Admin</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              <Link 
                href="/admin" 
                className={`${
                  pathname === '/admin' 
                    ? 'bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
              >
                <HomeIcon className="mr-4 h-6 w-6" />
                Dashboard
              </Link>
              
              <Link 
                href="/admin/cv" 
                className={`${
                  pathname === '/admin/cv' 
                    ? 'bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
              >
                <DocumentTextIcon className="mr-4 h-6 w-6" />
                Curriculum
              </Link>
              
              <Link 
                href="/admin/recursos" 
                className={`${
                  pathname === '/admin/recursos' || pathname.startsWith('/admin/recursos/') 
                    ? 'bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
              >
                <PhotoIcon className="mr-4 h-6 w-6" />
                Recursos
              </Link>
              
              <button
                onClick={handleLogout}
                className="w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
              >
                <ArrowRightOnRectangleIcon className="mr-4 h-6 w-6" />
                Cerrar Sesión
              </button>
            </nav>
          </div>
        </div>
        
        <div className="flex-shrink-0 w-14"></div>
      </div>
      
      {/* Sidebar para desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <span className="text-xl font-bold text-gray-900 dark:text-white">Panel de Admin</span>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white dark:bg-gray-900 space-y-1">
                <Link 
                  href="/admin" 
                  className={`${
                    pathname === '/admin' 
                      ? 'bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <HomeIcon className="mr-3 h-6 w-6" />
                  Dashboard
                </Link>
                
                <Link 
                  href="/admin/cv" 
                  className={`${
                    pathname === '/admin/cv' 
                      ? 'bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <DocumentTextIcon className="mr-3 h-6 w-6" />
                  Curriculum
                </Link>
                
                <Link 
                  href="/admin/recursos" 
                  className={`${
                    pathname === '/admin/recursos' || pathname.startsWith('/admin/recursos/') 
                      ? 'bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <PhotoIcon className="mr-3 h-6 w-6" />
                  Recursos
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  <ArrowRightOnRectangleIcon className="mr-3 h-6 w-6" />
                  Cerrar Sesión
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="sr-only">Abrir sidebar</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-100 dark:bg-gray-800">
          {children}
        </main>
      </div>
    </div>
  );
}