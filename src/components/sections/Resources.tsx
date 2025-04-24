'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { DocumentTextIcon, PresentationChartBarIcon, DocumentIcon } from '@heroicons/react/24/outline';

// Definición de tipos para los recursos destacados
type FeaturedResource = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  link: string;
};

// Datos de recursos destacados
const featuredResources: FeaturedResource[] = [
  {
    id: '1',
    title: 'Guía de Análisis Literario',
    description: 'Una guía completa para que los estudiantes desarrollen habilidades de análisis de textos literarios.',
    icon: <DocumentTextIcon className="h-10 w-10" />,
    category: 'Material Didáctico',
    link: '/recursos#guia-analisis'
  },
  {
    id: '2',
    title: 'Presentación: Literatura del Siglo XX',
    description: 'Presentación interactiva sobre los principales movimientos literarios del siglo XX.',
    icon: <PresentationChartBarIcon className="h-10 w-10" />,
    category: 'Presentación',
    link: '/recursos#literatura-siglo-xx'
  },
  {
    id: '3',
    title: 'Proyecto: Periódico Escolar',
    description: 'Guía para desarrollar un proyecto de periódico escolar con los alumnos.',
    icon: <DocumentIcon className="h-10 w-10" />,
    category: 'Proyecto',
    link: '/recursos#proyecto-periodico'
  }
];

export function Resources() {
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
                      {resource.icon}
                    </div>
                  </div>
                  
                  <div className="text-center mb-4">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {resource.category}
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
                      href={resource.link} 
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
        </motion.div>
      </div>
    </section>
  );
}
