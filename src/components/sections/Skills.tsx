'use client';

import { motion } from 'framer-motion';
import { AcademicCapIcon, PresentationChartBarIcon, UserGroupIcon, BookOpenIcon, LightBulbIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

// Definición de tipos para las habilidades
type Skill = {
  name: string;
  icon: React.ReactNode;
  description: string;
};

// Datos de habilidades
const skills: Skill[] = [
  {
    name: 'Metodologías Didácticas',
    icon: <AcademicCapIcon className="h-8 w-8 text-primary-600" />,
    description: 'Dominio de diversas metodologías activas como el aprendizaje basado en proyectos, flipped classroom y gamificación.'
  },
  {
    name: 'Diseño de Material Educativo',
    icon: <PresentationChartBarIcon className="h-8 w-8 text-primary-600" />,
    description: 'Creación de recursos didácticos adaptados a diferentes niveles y necesidades educativas específicas.'
  },
  {
    name: 'Gestión del Aula',
    icon: <UserGroupIcon className="h-8 w-8 text-primary-600" />,
    description: 'Capacidad para crear un ambiente positivo de aprendizaje y gestionar eficazmente grupos diversos.'
  },
  {
    name: 'Competencia Lingüística',
    icon: <BookOpenIcon className="h-8 w-8 text-primary-600" />,
    description: 'Amplio conocimiento de lengua, literatura y técnicas de expresión oral y escrita.'
  },
  {
    name: 'Innovación Educativa',
    icon: <LightBulbIcon className="h-8 w-8 text-primary-600" />,
    description: 'Incorporación constante de nuevas tendencias y enfoques pedagógicos para mejorar el proceso de enseñanza-aprendizaje.'
  },
  {
    name: 'Tecnología Educativa',
    icon: <ComputerDesktopIcon className="h-8 w-8 text-primary-600" />,
    description: 'Manejo de plataformas educativas, herramientas digitales y creación de contenido multimedia para el aula.'
  },
];

export function Skills() {
  // Animación para los elementos que aparecen en cascada
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="skills" className="section">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-center">Habilidades Profesionales</h2>
          
          <p className="text-center max-w-3xl mx-auto mb-16">
            Como <span className="tdh-helper">profesional</span> de la educación, he desarrollado un conjunto de 
            <span className="tdh-helper">competencias</span> que me permiten facilitar el 
            <span className="tdh-helper">aprendizaje</span> de manera efectiva y significativa.
          </p>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {skill.icon}
                  <h3 className="ml-3 text-xl font-serif font-semibold">
                    {skill.name}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
