'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CVData } from '@/lib/data';

export default function CVEditor() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CVData>();
  
  // Cargar datos del CV al inicio
  useEffect(() => {
    const fetchCV = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/cv');
        
        if (!response.ok) {
          throw new Error('Error al cargar datos del CV');
        }
        
        const data = await response.json();
        reset(data); // Rellenar el formulario con los datos existentes
      } catch (error) {
        console.error('Error:', error);
        setError('No se pudieron cargar los datos del CV. Por favor, inténtalo de nuevo.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCV();
  }, [reset]);
  
  // Manejar guardado del CV
  const onSubmit = async (data: CVData) => {
    try {
      setIsSaving(true);
      setError('');
      setSuccessMessage('');
      
      const response = await fetch('/api/cv', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }
      
      setSuccessMessage('Cambios guardados correctamente');
      
      // Actualizar el formulario con los datos más recientes
      const updatedData = await response.json();
      reset(updatedData);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al guardar los cambios. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSaving(false);
      
      // Ocultar mensaje de éxito después de 3 segundos
      if (successMessage) {
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    }
  };
  
  // Mostrar spinner mientras carga
  if (isLoading) {
    return (
      <div className="py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Editar Curriculum</h1>
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
      <div className="mx-auto max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Editar Curriculum</h1>
          
          {/* Botón para guardar */}
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
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
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Información Personal */}
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Información Personal
              </h3>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="personal.name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nombre
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="personal.name"
                      {...register('personal.name', { required: 'El nombre es obligatorio' })}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                    {errors.personal?.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.personal.name.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="personal.title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Título
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="personal.title"
                      {...register('personal.title', { required: 'El título es obligatorio' })}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                    {errors.personal?.title && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.personal.title.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="personal.specialization" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Centro Educativo
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="personal.specialization"
                      {...register('personal.specialization', { required: 'El centro educativo es obligatorio' })}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                    {errors.personal?.specialization && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.personal.specialization.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="personal.email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="personal.email"
                      {...register('personal.email', { 
                        required: 'El email es obligatorio',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Dirección de email inválida'
                        }
                      })}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                    {errors.personal?.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.personal.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="personal.phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Teléfono
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="personal.phone"
                      {...register('personal.phone', { required: 'El teléfono es obligatorio' })}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                    {errors.personal?.phone && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.personal.phone.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="personal.location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ubicación
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="personal.location"
                      {...register('personal.location', { required: 'La ubicación es obligatoria' })}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                    {errors.personal?.location && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.personal.location.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sobre Mí */}
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Sobre Mí
              </h3>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Descripción
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      rows={6}
                      {...register('about', { required: 'La descripción es obligatoria' })}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                    />
                    {errors.about && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.about.message}</p>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Escribe una breve descripción sobre ti y tu experiencia profesional.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Botón de guardar al final */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
