'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserIcon, DocumentTextIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { Resource } from '@/lib/data';

export default function AdminDashboard() {
  const [cvData, setCVData] = useState<any>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Obtener datos del CV
        const cvResponse = await fetch('/api/cv');
        const cvData = await cvResponse.json();
        
        // Obtener recursos
        const resourcesResponse = await fetch('/api/resources');
        const resourcesData = await resourcesResponse.json();
        
        setCVData(cvData);
        setResources(resourcesData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setError('Error al cargar datos. Por favor, inténtalo de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Renderizado mientras carga
  if (isLoading) {
    return (
      <div className="py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
            <span className="ml-3">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }
  
  // Renderizado si hay error
  if (error) {
    return (
      <div className="py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>
          <div className="bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 p-4 rounded-md">
            {error}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Tarjeta de Información Personal */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
                <UserIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                Información Personal
              </h2>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Nombre: <span className="text-gray-900 dark:text-white">{cvData?.personal?.name || 'N/A'}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Título: <span className="text-gray-900 dark:text-white">{cvData?.personal?.title || 'N/A'}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Centro: <span className="text-gray-900 dark:text-white">{cvData?.personal?.specialization || 'N/A'}</span>
              </p>
            </div>
            <div className="mt-6">
              <Link 
                href="/admin/cv" 
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
              >
                Editar Información →
              </Link>
            </div>
          </div>
          
          {/* Tarjeta de Curriculum */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
                <DocumentTextIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                Curriculum
              </h2>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Experiencias: <span className="text-gray-900 dark:text-white">{cvData?.experience?.length || 0}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Formación: <span className="text-gray-900 dark:text-white">{cvData?.education?.length || 0}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Certificaciones: <span className="text-gray-900 dark:text-white">{cvData?.certifications?.length || 0}</span>
              </p>
            </div>
            <div className="mt-6">
              <Link 
                href="/admin/cv" 
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
              >
                Editar Curriculum →
              </Link>
            </div>
          </div>
          
          {/* Tarjeta de Recursos */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
                <PhotoIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                Recursos
              </h2>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total recursos: <span className="text-gray-900 dark:text-white">{resources?.length || 0}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Última actualización: <span className="text-gray-900 dark:text-white">Hoy</span>
              </p>
            </div>
            <div className="mt-6">
              <Link 
                href="/admin/recursos" 
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
              >
                Gestionar Recursos →
              </Link>
            </div>
          </div>
        </div>
        
        {/* Últimos recursos añadidos */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Últimos Recursos Añadidos
          </h2>
          
          {resources && resources.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Título
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Nivel
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Formato
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {resources.slice(0, 5).map((resource) => (
                    <tr key={resource.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {resource.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {resource.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {resource.level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {resource.format}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          href={`/admin/recursos/${resource.id}`} 
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          Editar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No hay recursos disponibles.
            </p>
          )}
          
          <div className="mt-6 text-right">
            <Link 
              href="/admin/recursos" 
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
            >
              Ver todos los recursos →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
