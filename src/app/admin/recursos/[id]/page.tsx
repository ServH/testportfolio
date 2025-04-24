'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ArrowLeftIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Resource } from '@/lib/data';

type ResourceFormData = {
  title: string;
  description: string;
  category: string;
  level: string;
  format: string;
};

export default function EditResource({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resource, setResource] = useState<Resource | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [documentUploadProgress, setDocumentUploadProgress] = useState(0);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ResourceFormData>();
  
  // Cargar los datos del recurso
  useEffect(() => {
    const fetchResource = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/resources/${id}`);
        
        if (!response.ok) {
          throw new Error('Error al cargar el recurso');
        }
        
        const data = await response.json();
        setResource(data);
        
        // Precargar el formulario con los datos del recurso
        reset({
          title: data.title,
          description: data.description,
          category: data.category,
          level: data.level,
          format: data.format,
        });
      } catch (error) {
        console.error('Error:', error);
        setError('No se pudo cargar el recurso. Por favor, inténtalo de nuevo.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResource();
  }, [id, reset]);
  
  const onSubmit = async (data: ResourceFormData) => {
    try {
      setIsSubmitting(true);
      setError('');
      setSuccessMessage('');
      
      let updateData: Partial<Resource> = { ...data };
      
      // Si se ha seleccionado un nuevo documento, subirlo
      if (documentFile) {
        setDocumentUploadProgress(10);
        const documentFormData = new FormData();
        documentFormData.append('file', documentFile);
        
        const documentResponse = await fetch('/api/upload?type=document', {
          method: 'POST',
          body: documentFormData,
        });
        
        if (!documentResponse.ok) {
          throw new Error('Error al subir documento');
        }
        
        const documentData = await documentResponse.json();
        updateData.downloadUrl = documentData.filePath;
        setDocumentUploadProgress(100);
      }
      
      // Si se ha seleccionado una nueva imagen, subirla
      if (thumbnailFile) {
        setThumbnailUploadProgress(10);
        const thumbnailFormData = new FormData();
        thumbnailFormData.append('file', thumbnailFile);
        
        const thumbnailResponse = await fetch('/api/upload?type=image', {
          method: 'POST',
          body: thumbnailFormData,
        });
        
        if (!thumbnailResponse.ok) {
          throw new Error('Error al subir imagen');
        }
        
        const thumbnailData = await thumbnailResponse.json();
        updateData.thumbnail = thumbnailData.filePath;
        setThumbnailUploadProgress(100);
      }
      
      // Actualizar el recurso en la base de datos
      const resourceResponse = await fetch(`/api/resources/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (!resourceResponse.ok) {
        throw new Error('Error al actualizar recurso');
      }
      
      const updatedResource = await resourceResponse.json();
      setResource(updatedResource);
      setSuccessMessage('Recurso actualizado correctamente');
      
      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al actualizar el recurso. Por favor, inténtalo de nuevo.');
      setDocumentUploadProgress(0);
      setThumbnailUploadProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Manejar la selección de archivo para el documento
  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocumentFile(e.target.files[0]);
    }
  };
  
  // Manejar la selección de archivo para la imagen
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumbnailFile(e.target.files[0]);
    }
  };
  
  // Mostrar spinner mientras carga
  if (isLoading) {
    return (
      <div className="py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Editar Recurso</h1>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
            <span className="ml-3">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }
  
  // Si no se encuentra el recurso
  if (!resource) {
    return (
      <div className="py-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center mb-8">
            <Link 
              href="/admin/recursos" 
              className="mr-4 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              <span>Volver</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Recurso no encontrado</h1>
          </div>
          <div className="bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 p-6 rounded-md">
            El recurso que intentas editar no existe o ha sido eliminado.
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center mb-8">
          <Link 
            href="/admin/recursos" 
            className="mr-4 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            <span>Volver</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Editar Recurso</h1>
        </div>
        
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
        
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-6">
          <div className="grid grid-cols-1 gap-y-6">
            {/* Título */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Título <span className="text-red-600">*</span>
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="title"
                  {...register('title', { required: 'El título es obligatorio' })}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
                )}
              </div>
            </div>
            
            {/* Descripción */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Descripción <span className="text-red-600">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  rows={4}
                  {...register('description', { required: 'La descripción es obligatoria' })}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
                )}
              </div>
            </div>
            
            {/* Categoría */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Categoría <span className="text-red-600">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="category"
                  {...register('category', { required: 'La categoría es obligatoria' })}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="material-didactico">Material Didáctico</option>
                  <option value="actividades">Actividades</option>
                  <option value="evaluacion">Evaluación</option>
                  <option value="presentacion">Presentación</option>
                  <option value="proyecto">Proyecto</option>
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category.message}</p>
                )}
              </div>
            </div>
            
            {/* Nivel */}
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nivel <span className="text-red-600">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="level"
                  {...register('level', { required: 'El nivel es obligatorio' })}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                >
                  <option value="">Selecciona un nivel</option>
                  <option value="eso">ESO</option>
                  <option value="bachillerato">Bachillerato</option>
                </select>
                {errors.level && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.level.message}</p>
                )}
              </div>
            </div>
            
            {/* Formato */}
            <div>
              <label htmlFor="format" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Formato <span className="text-red-600">*</span>
              </label>
              <div className="mt-1">
                <select
                  id="format"
                  {...register('format', { required: 'El formato es obligatorio' })}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                >
                  <option value="">Selecciona un formato</option>
                  <option value="pdf">PDF</option>
                  <option value="doc">Word</option>
                  <option value="ppt">PowerPoint</option>
                  <option value="img">Imagen</option>
                </select>
                {errors.format && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.format.message}</p>
                )}
              </div>
            </div>
            
            {/* Archivo actual */}
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Archivo actual
                </label>
                <a 
                  href={resource.downloadUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm"
                >
                  Ver archivo
                </a>
              </div>
              <div className="mt-1 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-md flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {resource.downloadUrl.split('/').pop()}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Subida de nuevo archivo */}
            <div>
              <label htmlFor="document" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nuevo archivo (opcional)
              </label>
              <div className="mt-1">
                <div className="flex items-center justify-center w-full">
                  <label 
                    htmlFor="document" 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ArrowUpTrayIcon className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Haz clic para seleccionar</span> o arrastra un archivo
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF, Word, PowerPoint o imagen
                      </p>
                    </div>
                    <input 
                      id="document" 
                      type="file" 
                      onChange={handleDocumentChange} 
                      className="hidden" 
                    />
                  </label>
                </div>
                {documentFile && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Archivo seleccionado: {documentFile.name}
                    </p>
                    {documentUploadProgress > 0 && (
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                        <div 
                          className="bg-primary-600 h-2.5 rounded-full" 
                          style={{ width: `${documentUploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Imagen actual */}
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Imagen actual
                </label>
              </div>
              <div className="mt-1">
                <img 
                  src={resource.thumbnail} 
                  alt={resource.title} 
                  className="h-32 w-auto object-cover rounded-md border border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
            
            {/* Subida de nueva imagen */}
            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nueva imagen (opcional)
              </label>
              <div className="mt-1">
                <div className="flex items-center justify-center w-full">
                  <label 
                    htmlFor="thumbnail" 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ArrowUpTrayIcon className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Haz clic para seleccionar</span> o arrastra una imagen
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        JPG, PNG o GIF
                      </p>
                    </div>
                    <input 
                      id="thumbnail" 
                      type="file" 
                      accept="image/*"
                      onChange={handleThumbnailChange} 
                      className="hidden" 
                    />
                  </label>
                </div>
                {thumbnailFile && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Imagen seleccionada: {thumbnailFile.name}
                    </p>
                    {thumbnailUploadProgress > 0 && (
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                        <div 
                          className="bg-primary-600 h-2.5 rounded-full" 
                          style={{ width: `${thumbnailUploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="pt-4 flex space-x-3">
              <Link
                href="/admin/recursos"
                className="flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}