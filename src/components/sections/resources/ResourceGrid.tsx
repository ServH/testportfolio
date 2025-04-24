'use client';

import { useState } from 'react';
import { ArrowDownTrayIcon, DocumentTextIcon, PresentationChartBarIcon, DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

// Tipo para recursos
export type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  format: string;
  thumbnail: string;
  downloadUrl: string;
};

interface ResourceGridProps {
  resources: Resource[];
}

export function ResourceGrid({ resources }: ResourceGridProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  
  // Función para manejar la descarga simulada
  const handleDownload = (id: string, url: string) => {
    setDownloadingId(id);
    
    // Simulamos una carga con timeout
    setTimeout(() => {
      // En una implementación real, esto descargaría el archivo
      const link = document.createElement('a');
      link.href = url;
      link.download = url.split('/').pop() || 'recurso';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setDownloadingId(null);
    }, 1000);
  };
  
  // Función para obtener el icono según el formato
  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf':
        return <DocumentTextIcon className="h-5 w-5" />;
      case 'ppt':
        return <PresentationChartBarIcon className="h-5 w-5" />;
      case 'doc':
        return <DocumentIcon className="h-5 w-5" />;
      case 'img':
        return <PhotoIcon className="h-5 w-5" />;
      default:
        return <DocumentTextIcon className="h-5 w-5" />;
    }
  };
  
  // Función para obtener etiqueta de categoría
  const getCategoryLabel = (category: string) => {
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
  
  // Función para obtener etiqueta de nivel
  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'eso':
        return 'ESO';
      case 'bachillerato':
        return 'Bachillerato';
      default:
        return level;
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.length === 0 ? (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No se encontraron recursos con los filtros seleccionados.
          </p>
        </div>
      ) : (
        resources.map((resource) => (
          <div 
            key={resource.id}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Imagen de previsualización */}
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
              {/* En una implementación real, esto mostraría la imagen del recurso */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20" />
              <div className="h-full w-full flex items-center justify-center">
                <span className="text-4xl text-gray-400 dark:text-gray-500">
                  {getFormatIcon(resource.format)}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              {/* Etiquetas */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-medium py-1 px-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-md">
                  {getCategoryLabel(resource.category)}
                </span>
                <span className="text-xs font-medium py-1 px-2 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 rounded-md">
                  {getLevelLabel(resource.level)}
                </span>
                <span className="text-xs font-medium py-1 px-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md uppercase">
                  {resource.format}
                </span>
              </div>
              
              {/* Título y descripción */}
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {resource.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
                {resource.description}
              </p>
              
              {/* Botón de descarga */}
              <button
                onClick={() => handleDownload(resource.id, resource.downloadUrl)}
                disabled={downloadingId === resource.id}
                className="w-full btn btn-outline flex items-center justify-center"
                aria-label={`Descargar ${resource.title}`}
              >
                {downloadingId === resource.id ? (
                  <>
                    <svg 
                      className="animate-spin -ml-1 mr-2 h-4 w-4" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Descargando...
                  </>
                ) : (
                  <>
                    <ArrowDownTrayIcon className="mr-2 h-4 w-4" />
                    Descargar
                  </>
                )}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
