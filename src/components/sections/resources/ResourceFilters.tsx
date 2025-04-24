'use client';

import { useState } from 'react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Opciones para cada tipo de filtro
const categoryOptions = [
  { value: 'all', label: 'Todas las categorías' },
  { value: 'material-didactico', label: 'Material Didáctico' },
  { value: 'actividades', label: 'Actividades' },
  { value: 'evaluacion', label: 'Evaluación' },
  { value: 'presentacion', label: 'Presentaciones' },
  { value: 'proyecto', label: 'Proyectos' },
];

const levelOptions = [
  { value: 'all', label: 'Todos los niveles' },
  { value: 'eso', label: 'ESO' },
  { value: 'bachillerato', label: 'Bachillerato' },
];

const formatOptions = [
  { value: 'all', label: 'Todos los formatos' },
  { value: 'pdf', label: 'PDF' },
  { value: 'doc', label: 'Word' },
  { value: 'ppt', label: 'PowerPoint' },
  { value: 'img', label: 'Imagen' },
];

export function ResourceFilters() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Función para limpiar todos los filtros
  const clearFilters = () => {
    setCategoryFilter('all');
    setLevelFilter('all');
    setFormatFilter('all');
  };
  
  // Número de filtros activos (excluyendo 'all')
  const activeFiltersCount = [
    categoryFilter !== 'all', 
    levelFilter !== 'all', 
    formatFilter !== 'all'
  ].filter(Boolean).length;
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-serif font-semibold">
          Filtrar Recursos
        </h2>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center text-primary-600 hover:text-primary-700"
          aria-expanded={showFilters}
          aria-controls="resource-filters"
        >
          <FunnelIcon className="h-5 w-5 mr-1" />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-primary-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>
      
      {showFilters && (
        <div 
          id="resource-filters"
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Aplicar filtros</h3>
            <button 
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center"
              aria-label="Limpiar todos los filtros"
            >
              <XMarkIcon className="h-4 w-4 mr-1" />
              Limpiar filtros
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {/* Filtro por categoría */}
            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium mb-2">
                Categoría
              </label>
              <select
                id="category-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 focus-ring"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Filtro por nivel */}
            <div>
              <label htmlFor="level-filter" className="block text-sm font-medium mb-2">
                Nivel
              </label>
              <select
                id="level-filter"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 focus-ring"
              >
                {levelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Filtro por formato */}
            <div>
              <label htmlFor="format-filter" className="block text-sm font-medium mb-2">
                Formato
              </label>
              <select
                id="format-filter"
                value={formatFilter}
                onChange={(e) => setFormatFilter(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 focus-ring"
              >
                {formatOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
