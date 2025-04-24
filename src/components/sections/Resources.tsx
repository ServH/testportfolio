'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { DocumentTextIcon, PresentationChartBarIcon, DocumentIcon } from '@heroicons/react/24/outline';

// Definición de tipos para los recursos
type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  format: string;
  thumbnail: string;
  downloadUrl: string;
};

// Componente para el icono basado en el formato del recurso
const ResourceIcon = ({ format }: { format: string }) => {
  switch (format) {
    case 'pdf':
      return <DocumentTextIcon className="h-10 w-10" />;
    case 'ppt':
    case 'pptx':
      return <PresentationChartBarIcon className="h-10 w-10" />;
    default:
      return <DocumentIcon className="h-10 w-10" />;
  }
};

// Función para formatear la categoría para mostrar
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

export function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar recursos cuando se monta el componente
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
        setError('No se pudieron cargar los recursos.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResources();
  }, []);

  // Mostrar máximo 3 recursos destacados
  const featuredResources = resources.slice(0, 3);

  return (
    <section id="resources" className="section bg-gray-50 dark:bg-gray-900">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-center">Recursos Educativos</h2>
          
          <p className="text-center max-w-3xl mx-auto mb-16">
            <span className="tdh-helper">Comparto</span> algunos de mis mejores recursos 
            <span className="tdh-helper">educativos</span> que he desarrollado a lo largo de mi 
            <span className="tdh-helper">carrera</span>. Estos materiales están diseñados para 
            <span className="tdh-helper">inspirar</span> y facilitar el aprendizaje.
          </p>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
              <span className="ml-3">Cargando recursos...</span>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">
              {error}
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {featuredResources.map((resource) => (
                  <motion.div
                    key={resource.id}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="p-6">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                          <ResourceIcon format={resource.format} />
                        </div>
                      </div>
                      
                      <div className="text-center mb-4">
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                          {formatCategory(resource.category)}
                        </span>
                        <h3 className="text-xl font-serif font-semibold mt-1">
                          {resource.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                        {resource.description}
                      </p>
                      
                      <div className="text-center">
                        <Link 
                          href={`/recursos#${resource.id}`} 
                          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                        >
                          Ver recurso →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Link 
                  href="/recursos" 
                  className="btn btn-primary inline-flex items-center"
                >
                  Ver todos los recursos
                  <svg 
                    className="ml-2 h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}