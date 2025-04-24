'use client';

import { UseFormRegister, FieldErrors, UseFieldArrayReturn, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { CVData, Experience } from '@/lib/data';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ExperienceFormProps {
  register: UseFormRegister<CVData>;
  errors: FieldErrors<CVData>;
  experienceArray: UseFieldArrayReturn<CVData, 'experience', 'id'>;
  getValues: UseFormGetValues<CVData>;
  setValue: UseFormSetValue<CVData>;
}

export default function ExperienceForm({ 
  register, 
  errors, 
  experienceArray, 
  getValues, 
  setValue 
}: ExperienceFormProps) {
  const { fields, append, remove } = experienceArray;
  
  // Añade una nueva experiencia
  const addNewExperience = () => {
    append({
      id: crypto.randomUUID(),
      position: '',
      company: '',
      location: '',
      period: '',
      description: [''],
    } as Experience);
  };
  
  // Añade un nuevo punto a la descripción de una experiencia
  const addDescriptionPoint = (experienceIndex: number) => {
    const currentExperience = getValues(`experience.${experienceIndex}`);
    if (currentExperience) {
      const updatedDescription = [...(currentExperience.description || []), ''];
      setValue(`experience.${experienceIndex}.description`, updatedDescription);
    }
  };
  
  // Elimina un punto de la descripción de una experiencia
  const removeDescriptionPoint = (experienceIndex: number, pointIndex: number) => {
    const currentExperience = getValues(`experience.${experienceIndex}`);
    if (currentExperience && currentExperience.description) {
      const updatedDescription = [...currentExperience.description];
      updatedDescription.splice(pointIndex, 1);
      setValue(`experience.${experienceIndex}.description`, updatedDescription);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Experiencia Profesional
        </h3>
        <button
          type="button"
          onClick={addNewExperience}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusIcon className="h-5 w-5 mr-1" /> Añadir
        </button>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
        {fields.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No hay experiencias añadidas. Haz clic en "Añadir" para comenzar.
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
                  {/* Puesto */}
                  <div className="sm:col-span-3">
                    <label htmlFor={`experience.${index}.position`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Puesto
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register(`experience.${index}.position` as const, { required: 'El puesto es obligatorio' })}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                      />
                    </div>
                  </div>
                  
                  {/* Empresa */}
                  <div className="sm:col-span-3">
                    <label htmlFor={`experience.${index}.company`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Empresa
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register(`experience.${index}.company` as const, { required: 'La empresa es obligatoria' })}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                      />
                    </div>
                  </div>
                  
                  {/* Ubicación */}
                  <div className="sm:col-span-3">
                    <label htmlFor={`experience.${index}.location`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Ubicación
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register(`experience.${index}.location` as const, { required: 'La ubicación es obligatoria' })}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                      />
                    </div>
                  </div>
                  
                  {/* Período */}
                  <div className="sm:col-span-3">
                    <label htmlFor={`experience.${index}.period`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Período
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        placeholder="Ej: Enero 2020 - Presente"
                        {...register(`experience.${index}.period` as const, { required: 'El período es obligatorio' })}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                      />
                    </div>
                  </div>
                  
                  {/* Descripción */}
                  <div className="sm:col-span-6">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Descripción
                      </label>
                      <button
                        type="button"
                        onClick={() => addDescriptionPoint(index)}
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm"
                      >
                        + Añadir punto
                      </button>
                    </div>
                    <div className="mt-2 space-y-3">
                      {getValues(`experience.${index}.description`)?.map((_, pointIndex) => (
                        <div key={pointIndex} className="flex items-start">
                          <input
                            type="text"
                            {...register(`experience.${index}.description.${pointIndex}` as const)}
                            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeDescriptionPoint(index, pointIndex)}
                            className="ml-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      {!getValues(`experience.${index}.description`) || 
                       getValues(`experience.${index}.description`).length === 0 && (
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          No hay puntos de descripción. Añade al menos uno.
                        </p>
                      )}
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