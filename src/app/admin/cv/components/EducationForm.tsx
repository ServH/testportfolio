'use client';

import { UseFormRegister, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { CVData, Education } from '@/lib/data';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface EducationFormProps {
  register: UseFormRegister<CVData>;
  errors: FieldErrors<CVData>;
  educationArray: UseFieldArrayReturn<CVData, 'education', 'id'>;
}

export default function EducationForm({ 
  register, 
  errors, 
  educationArray
}: EducationFormProps) {
  const { fields, append, remove } = educationArray;
  
  // Añade una nueva formación académica
  const addNewEducation = () => {
    append({
      id: crypto.randomUUID(),
      degree: '',
      institution: '',
      location: '',
      period: '',
      description: '',
    } as Education);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Formación Académica
        </h3>
        <button
          type="button"
          onClick={addNewEducation}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusIcon className="h-5 w-5 mr-1" /> Añadir
        </button>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
        {fields.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No hay formación académica añadida. Haz clic en "Añadir" para comenzar.
          </p>
        ) : (
          <div className="space-y-8">
            {fields.map((item, index) => (
              <div key={item.id} className="relative bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 mt-4">
                  {/* Título/Grado */}
                  <div className="sm:col-span-6">
                    <label htmlFor={`education.${index}.degree`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Título/Grado
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register(`education.${index}.degree` as const, { required: 'El título es obligatorio' })}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                      />
                    </div>
                  </div>
                  
                  {/* Institución */}
                  <div className="sm:col-span-3">
                    <label htmlFor={`education.${index}.institution`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Institución
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register(`education.${index}.institution` as const, { required: 'La institución es obligatoria' })}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                      />
                    </div>
                  </div>
                  
                  {/* Ubicación */}
                  <div className="sm:col-span-3">
                    <label htmlFor={`education.${index}.location`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ubicación
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register(`education.${index}.location` as const, { required: 'La ubicación es obligatoria' })}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                      />
                    </div>
                  </div>
                  
                  {/* Período */}
                  <div className="sm:col-span-6">
                    <label htmlFor={`education.${index}.period`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Período
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        placeholder="Ej: 2015 - 2020"
                        {...register(`education.${index}.period` as const, { required: 'El período es obligatorio' })}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                      />
                    </div>
                  </div>
                  
                  {/* Descripción */}
                  <div className="sm:col-span-6">
                    <label htmlFor={`education.${index}.description`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Descripción (opcional)
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={3}
                        {...register(`education.${index}.description` as const)}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}