'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function About() {
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
                <p className="content-paragraph">
                  Soy <span className="tdh-helper">profesora</span> de Secundaria en el Centro Educativo Salesianos San Juan Bosco con más de <span className="tdh-helper">diez años</span> de experiencia docente. Mi formación académica y experiencia me han proporcionado las <span className="tdh-helper">herramientas</span> necesarias para crear un entorno de aprendizaje estimulante e inclusivo.
                </p>
                
                <p className="content-paragraph">
                  Mi <span className="tdh-helper">filosofía</span> educativa se centra en el desarrollo integral del alumno, combinando la enseñanza de contenidos académicos con el fomento de <span className="tdh-helper">habilidades</span> críticas y creativas. Creo firmemente en la <span className="tdh-helper">adaptación</span> de metodologías para atender a la diversidad del alumnado.
                </p>
                
                <p className="content-paragraph">
                  Además de mi labor docente, participo activamente en <span className="tdh-helper">proyectos</span> de innovación educativa y soy autora de varios <span className="tdh-helper">materiales</span> didácticos especializados para el desarrollo educativo de los estudiantes.
                </p>
                
                <blockquote className="italic border-l-4 border-primary-500 pl-4 mt-6">
                  "Mi objetivo es inspirar en mis alumnos no solo el amor por el aprendizaje, sino también las competencias necesarias para su desarrollo personal y profesional en un mundo en constante cambio."
                </blockquote>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
