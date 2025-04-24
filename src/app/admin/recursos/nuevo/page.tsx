'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ArrowLeftIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type ResourceFormData = {
  title: string;
  description: string;
  category: string;
  level: string;
  format: string;
};

export default function NewResource() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [documentUploadProgress, setDocumentUploadProgress] = useState(0);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ResourceFormData>();
  
  const onSubmit = async (data: ResourceFormData) => {
    try {
      setIsSubmitting(true);
      setError('');
      
      if (!documentFile) {
        setError('Debes seleccionar un archivo para el recurso');
        setIsSubmitting(false);
        return;
      }
      
      if (!thumbnailFile) {
        setError('Debes seleccionar una imagen de portada');
        setIsSubmitting(false);
        return;
      }
      
      // Subir el archivo del documento
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
      const documentPath = documentData.filePath;
      setDocumentUploadProgress(50);
      
      // Subir la imagen de portada
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
      const thumbnailPath = thumbnailData.filePath;
      setThumbnailUploadProgress(50);
      
      // Crear el recurso en la base de datos
      const resourceResponse = await fetch('/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          downloadUrl: documentPath,
          thumbnail: thumbnailPath,
        }),
      });
      
      if (!resourceResponse.ok) {
        throw new Error('Error al crear recurso');
      }
      
      setDocumentUploadProgress(100);
      setThumbnailUploadProgress(100);
      
      // Redireccionar a la lista de recursos
      router.push('/admin/recursos');
    } catch (error) {
      console.error('Error:', error);
      setError('Error al crear el recurso. Por favor, inténtalo de nuevo.');
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nuevo Recurso</h1>
        </div>
        
        {error && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 p-3 rounded-md">
            {error}
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
            
            {/* Subida de archivo */}
            <div>
              <label htmlFor="document" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Archivo <span className="text-red-600">*</span>
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
            
            {/* Subida de imagen de portada */}
            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Imagen de portada <span className="text-red-600">*</span>
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
            
            {/* Botón de envío */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Creando recurso...' : 'Crear recurso'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}