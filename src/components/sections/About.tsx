'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Tipo para datos del CV
type CVPersonalData = {
  personal: {
    name: string;
    title: string;
    specialization: string;
    email: string;
    phone: string;
    location: string;
  };
  about: string;
};

export function About() {
  const [cvData, setCVData] = useState<CVPersonalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar datos del CV cuando se monta el componente
  useEffect(() => {
    const fetchCVData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/cv');
        
        if (!response.ok) {
          throw new Error('Error al cargar datos del CV');
        }
        
        const data = await response.json();
        setCVData(data);
      } catch (error) {
        console.error('Error:', error);
        setError('No se pudieron cargar los datos del perfil.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCVData();
  }, []);

  return (
    <section id="about" className="section bg-gray-50 dark:bg-gray-900">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-center mb-16">Sobre mí</h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
              <span className="ml-3">Cargando información...</span>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">
              {error}
            </div>
          ) : cvData ? (
            <div className="grid md:grid-cols-2 gap-10 items-center">
              {/* Imagen */}
              <div className="order-2 md:order-1">
                <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
                  {/* En una implementación real, esto sería una imagen de la profesora */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary-200 to-secondary-200 dark:from-primary-800 dark:to-secondary-800" />
                  <div className="absolute inset-0 bg-[url('/images/profile-placeholder.jpg')] bg-cover bg-center opacity-80" />
                </div>
              </div>
              
              {/* Contenido */}
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-serif font-semibold mb-6">
                  <span className="tdh-helper">Pasión</span> por la <span className="tdh-helper">educación</span> y el <span className="tdh-helper">desarrollo</span> personal
                </h3>
                
                <div className="space-y-4">
                  {/* Mostrar la biografía del CV */}
                  <p className="content-paragraph">
                    {cvData.about}
                  </p>
                  
                  <p className="content-paragraph">
                    Mi <span className="tdh-helper">filosofía</span> educativa se centra en el desarrollo integral del alumno, combinando la enseñanza de contenidos académicos con el fomento de <span className="tdh-helper">habilidades</span> críticas y creativas. Creo firmemente en la <span className="tdh-helper">adaptación</span> de metodologías para atender a la diversidad del alumnado.
                  </p>
                  
                  <blockquote className="italic border-l-4 border-primary-500 pl-4 mt-6">
                    "Mi objetivo es inspirar en mis alumnos no solo el amor por el aprendizaje, sino también las competencias necesarias para su desarrollo personal y profesional en un mundo en constante cambio."
                  </blockquote>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center">No hay información disponible.</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}