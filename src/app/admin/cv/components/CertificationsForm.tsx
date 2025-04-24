'use client';

import { UseFormRegister, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { CVData, Certification } from '@/lib/data';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface CertificationsFormProps {
  register: UseFormRegister<CVData>;
  errors: FieldErrors<CVData>;
  certificationsArray: UseFieldArrayReturn<CVData, 'certifications', 'id'>;
}

export default function CertificationsForm({ 
  register, 
  errors, 
  certificationsArray
}: CertificationsFormProps) {
  const { fields, append, remove } = certificationsArray;
  
  // Añade una nueva certificación
  const addNewCertification = () => {
    append({
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
    } as Certification);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Certificaciones
        </h3>
        <button
          type="button"
          onClick={addNewCertification}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusIcon className="h-5 w-5 mr-1" /> Añadir
        </button>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
        {fields.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No hay certificaciones añadidas. Haz clic en "Añadir" para comenzar.
          </p>
        ) : (
          <div className="space-y-6">
            {fields.map((cert, index) => (
              <div key={cert.id} className="relative bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 mt-4">
                  {/* Nombre de la certificación */}
                  <div className="sm:col-span-6">
                    <label htmlFor={`certifications.${index}.name`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nombre de la certificación
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register(`certifications.${index}.name` as const, { required: 'El nombre es obligatorio' })}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                      />
                    </div>
                  </div>
                  
                  {/* Entidad emisora */}
                  <div className="sm:col-span-4">
                    <label htmlFor={`certifications.${index}.issuer`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Entidad emisora
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register(`certifications.${index}.issuer` as const, { required: 'La entidad emisora es obligatoria' })}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                      />
                    </div>
                  </div>
                  
                  {/* Fecha */}
                  <div className="sm:col-span-2">
                    <label htmlFor={`certifications.${index}.date`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Fecha
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        placeholder="Ej: 2022"
                        {...register(`certifications.${index}.date` as const, { required: 'La fecha es obligatoria' })}
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