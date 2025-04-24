'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { CVData } from '@/lib/data';

interface PersonalInfoFormProps {
  register: UseFormRegister<CVData>;
  errors: FieldErrors<CVData>;
}

export default function PersonalInfoForm({ register, errors }: PersonalInfoFormProps) {
  return (
    <>
      {/* Información Personal */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Información Personal
          </h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="personal.name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nombre
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="personal.name"
                  {...register('personal.name', { required: 'El nombre es obligatorio' })}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                />
                {errors.personal?.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.personal.name.message}</p>
                )}
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="personal.title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Título
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="personal.title"
                  {...register('personal.title', { required: 'El título es obligatorio' })}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                />
                {errors.personal?.title && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.personal.title.message}</p>
                )}
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <label htmlFor="personal.specialization" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Centro Educativo
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="personal.specialization"
                  {...register('personal.specialization', { required: 'El centro educativo es obligatorio' })}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                />
                {errors.personal?.specialization && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.personal.specialization.message}</p>
                )}
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="personal.email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="personal.email"
                  {...register('personal.email', { 
                    required: 'El email es obligatorio',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Dirección de email inválida'
                    }
                  })}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                />
                {errors.personal?.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.personal.email.message}</p>
                )}
              </div>
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="personal.phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Teléfono
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="personal.phone"
                  {...register('personal.phone', { required: 'El teléfono es obligatorio' })}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                />
                {errors.personal?.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.personal.phone.message}</p>
                )}
              </div>
            </div>
            
            <div className="sm:col-span-6">
              <label htmlFor="personal.location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ubicación
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="personal.location"
                  {...register('personal.location', { required: 'La ubicación es obligatoria' })}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                />
                {errors.personal?.location && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.personal.location.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sobre Mí */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Sobre Mí
          </h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Descripción
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  rows={6}
                  {...register('about', { required: 'La descripción es obligatoria' })}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                />
                {errors.about && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.about.message}</p>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Escribe una breve descripción sobre ti y tu experiencia profesional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}