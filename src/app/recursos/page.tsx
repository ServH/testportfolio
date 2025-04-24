import { ResourceFilters } from '@/components/sections/resources/ResourceFilters';
import { ResourceGrid } from '@/components/sections/resources/ResourceGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recursos Educativos - Portfolio Profesional Docente',
  description: 'Colección de recursos educativos, materiales didácticos y herramientas para la enseñanza',
};

// Esta función demostrativa simula recursos cargados desde el servidor
// En una implementación real, esto sería reemplazado por una carga de datos desde una API
function getResourcesData() {
  return [
    {
      id: '1',
      title: 'Guía de Análisis Literario',
      description: 'Una guía completa para ayudar a los estudiantes a analizar textos literarios',
      category: 'material-didactico',
      level: 'eso',
      format: 'pdf',
      thumbnail: '/images/recursos/guia-analisis.jpg',
      downloadUrl: '/recursos/guia-analisis-literario.pdf',
    },
    {
      id: '2',
      title: 'Actividades de Gramática',
      description: 'Colección de ejercicios prácticos para reforzar conceptos gramaticales',
      category: 'actividades',
      level: 'eso',
      format: 'pdf',
      thumbnail: '/images/recursos/actividades-gramatica.jpg',
      downloadUrl: '/recursos/actividades-gramatica.pdf',
    },
    {
      id: '3',
      title: 'Presentación: Literatura del Siglo XX',
      description: 'Presentación interactiva sobre los principales movimientos literarios del siglo XX',
      category: 'presentacion',
      level: 'bachillerato',
      format: 'ppt',
      thumbnail: '/images/recursos/literatura-siglo-xx.jpg',
      downloadUrl: '/recursos/literatura-siglo-xx.pptx',
    },
    {
      id: '4',
      title: 'Evaluación Trimestral',
      description: 'Evaluación modelo para el primer trimestre de Lengua y Literatura',
      category: 'evaluacion',
      level: 'eso',
      format: 'doc',
      thumbnail: '/images/recursos/evaluacion-trimestral.jpg',
      downloadUrl: '/recursos/evaluacion-trimestral.docx',
    },
    {
      id: '5',
      title: 'Proyecto: Periódico Escolar',
      description: 'Guía para desarrollar un proyecto de periódico escolar con los alumnos',
      category: 'proyecto',
      level: 'bachillerato',
      format: 'pdf',
      thumbnail: '/images/recursos/proyecto-periodico.jpg',
      downloadUrl: '/recursos/proyecto-periodico-escolar.pdf',
    },
    {
      id: '6',
      title: 'Infografía: Figuras Literarias',
      description: 'Infografía visual que explica las principales figuras literarias',
      category: 'material-didactico',
      level: 'eso',
      format: 'img',
      thumbnail: '/images/recursos/infografia-figuras.jpg',
      downloadUrl: '/recursos/infografia-figuras-literarias.png',
    },
  ];
}

export default function ResourcesPage() {
  const resources = getResourcesData();
  
  return (
    <div className="container-custom my-8">
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Recursos Educativos</h1>
      
      <p className="content-paragraph text-lg mb-6">
        Bienvenido/a a mi <span className="tdh-helper">biblioteca</span> de recursos educativos. Aquí encontrarás una <span className="tdh-helper">colección</span> de materiales didácticos, actividades y herramientas que he desarrollado a lo largo de mi <span className="tdh-helper">carrera</span> docente.
      </p>
      
      <p className="content-paragraph mb-10">
        Todos los recursos están <span className="tdh-helper">disponibles</span> para su descarga y uso libre en el aula. Espero que sean de utilidad para tu <span className="tdh-helper">práctica</span> educativa.
      </p>
      
      <ResourceFilters />
      <ResourceGrid resources={resources} />
    </div>
  );
}
