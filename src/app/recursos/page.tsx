import { ResourceFilters } from '@/components/sections/resources/ResourceFilters';
import { ResourceGrid } from '@/components/sections/resources/ResourceGrid';
import { portfolioData } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recursos Educativos - Portfolio Profesional Docente',
  description: 'Colección de recursos educativos, materiales didácticos y herramientas para la enseñanza',
};

// Esta función ahora cargará los datos reales desde el sistema de datos
async function getResourcesData() {
  try {
    // Cargar recursos desde el sistema de datos
    const resources = await portfolioData.getResources();
    return resources;
  } catch (error) {
    console.error('Error al cargar recursos:', error);
    // En caso de error, devolver un array vacío
    return [];
  }
}

export default async function ResourcesPage() {
  // Ahora obtenemos los recursos de forma dinámica
  const resources = await getResourcesData();
  
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