'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Resource } from '@/lib/data';

export default function ResourcesManager() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Cargar recursos al inicio
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/resources');
        
        if (!response.ok) {
          throw new Error('Error al cargar recursos');
        }
        
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Error:', error);
        setError('No se pudieron cargar los recursos. Por favor, inténtalo de nuevo.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResources();
  }, []);
  
  // Confirmación para eliminar un recurso
  const confirmDelete = (id: string) => {
    setDeleteId(id);
  };
  
  // Cancelar eliminación
  const cancelDelete = () => {
    setDeleteId(null);
  };
  
  // Eliminar un recurso
  const deleteResource = async () => {
    if (!deleteId) return;
    
    try {
      setIsDeleting(true);
      
      const response = await fetch(`/api/resources/${deleteId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar recurso');
      }
      
      // Actualizar la lista de recursos
      setResources(resources.filter(r => r.id !== deleteId));
      setSuccessMessage('Recurso eliminado correctamente');
      
      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al eliminar el recurso. Por favor, inténtalo de nuevo.');
      
      // Ocultar mensaje de error después de 3 segundos
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };
  
  // Formatear categoría para mostrar
  const formatCategory = (category: string) => {
    switch (category) {
      case 'material-didactico':
        return 'Material Didáctico';
      case 'actividades':
        return 'Actividades';
      case 'evaluacion':
        return 'Evaluación';
      case 'presentacion':
        return 'Presentación';
      case 'proyecto':
        return 'Proyecto';
      default:
        return category;
    }
  };
  
  // Formatear nivel para mostrar
  const formatLevel = (level: string) => {
    switch (level) {
      case 'eso':
        return 'ESO';
      case 'bachillerato':
        return 'Bachillerato';
      default:
        return level;
    }
  };
  
  // Formatear formato para mostrar
  const formatFormat = (format: string) => {
    switch (format) {
      case 'pdf':
        return 'PDF';
      case 'doc':
        return 'Word';
      case 'ppt':
        return 'PowerPoint';
      case 'img':
        return 'Imagen';
      default:
        return format;
    }
  };
  
  // Mostrar spinner mientras carga
  if (isLoading) {
    return (
      <div className="py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Recursos Educativos</h1>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
            <span className="ml-3">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Recursos Educativos</h1>
          
          {/* Botón para crear nuevo recurso */}
          <Link 
            href="/admin/recursos/nuevo" 
            className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nuevo Recurso
          </Link>
        </div>
        
        {/* Mensajes de error o éxito */}
        {error && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 p-3 rounded-md">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="mb-4 bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400 p-3 rounded-md">
            {successMessage}
          </div>
        )}
        
        {/* Lista de recursos */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          {resources.length > 0 ? (
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
                  {resources.map((resource) => (
                    <tr key={resource.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {resource.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatCategory(resource.category)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatLevel(resource.level)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatFormat(resource.format)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link 
                            href={`/admin/recursos/${resource.id}`} 
                            className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                            title="Editar"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </Link>
                          <button 
                            onClick={() => confirmDelete(resource.id)} 
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            title="Eliminar"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No hay recursos disponibles. Añade tu primer recurso para comenzar.
              </p>
              <div className="mt-6">
                <Link 
                  href="/admin/recursos/nuevo" 
                  className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Nuevo Recurso
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal de confirmación de eliminación */}
      {deleteId && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 sm:mx-0 sm:h-10 sm:w-10">
                    <TrashIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Eliminar recurso
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ¿Estás seguro de que quieres eliminar este recurso? Esta acción no se puede deshacer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  onClick={deleteResource} 
                  disabled={isDeleting}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                >
                  {isDeleting ? 'Eliminando...' : 'Eliminar'}
                </button>
                <button 
                  type="button" 
                  onClick={cancelDelete} 
                  disabled={isDeleting}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
