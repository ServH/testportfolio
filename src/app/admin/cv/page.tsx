'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { CVData } from '@/lib/data';

// Importar los componentes de formulario
import PersonalInfoForm from './components/PersonalInfoForm';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';
import SkillsForm from './components/SkillsForm';
import CertificationsForm from './components/CertificationsForm';

export default function CVEditor() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('personal');
  
  const { register, handleSubmit, reset, control, formState: { errors }, getValues, setValue } = useForm<CVData>();
  
  // Configurar field arrays para secciones con múltiples elementos
  const experienceArray = useFieldArray({ control, name: 'experience' });
  const educationArray = useFieldArray({ control, name: 'education' });
  const skillGroupsArray = useFieldArray({ control, name: 'skillGroups' });
  const certificationsArray = useFieldArray({ control, name: 'certifications' });
  
  // Cargar datos del CV al inicio
  useEffect(() => {
    const fetchCV = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/cv');
        
        if (!response.ok) {
          throw new Error('Error al cargar datos del CV');
        }
        
        const data = await response.json();
        reset(data); // Rellenar el formulario con los datos existentes
      } catch (error) {
        console.error('Error:', error);
        setError('No se pudieron cargar los datos del CV. Por favor, inténtalo de nuevo.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCV();
  }, [reset]);
  
  // Manejar guardado del CV
  const onSubmit = async (data: CVData) => {
    try {
      setIsSaving(true);
      setError('');
      setSuccessMessage('');
      
      const response = await fetch('/api/cv', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }
      
      setSuccessMessage('Cambios guardados correctamente');
      
      // Actualizar el formulario con los datos más recientes
      const updatedData = await response.json();
      reset(updatedData);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al guardar los cambios. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSaving(false);
      
      // Ocultar mensaje de éxito después de 3 segundos
      if (successMessage) {
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    }
  };
  
  // Mostrar spinner mientras carga
  if (isLoading) {
    return (
      <div className="py-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Editar Curriculum</h1>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600"></div>
            <span className="ml-3">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Editar Curriculum</h1>
          
          {/* Botón para guardar */}
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
        
        {/* Mensajes de error o éxito */}
        {error && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 p-3 rounded-md">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="mb-4 bg-green-50 dark:bg-green-900/30 text-green-500 dark:text-green-400 p-3 rounded-md">
            {successMessage}
          </div>
        )}
        
        {/* Pestañas para navegar entre secciones */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('personal')}
              className={`${
                activeTab === 'personal'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Información Personal
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`${
                activeTab === 'experience'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Experiencia
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`${
                activeTab === 'education'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Formación
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`${
                activeTab === 'skills'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Habilidades
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              className={`${
                activeTab === 'certifications'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Certificaciones
            </button>
          </nav>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Mostrar el componente correspondiente según la pestaña activa */}
          {activeTab === 'personal' && (
            <PersonalInfoForm register={register} errors={errors} />
          )}
          
          {activeTab === 'experience' && (
            <ExperienceForm 
              register={register} 
              errors={errors} 
              experienceArray={experienceArray}
              getValues={getValues}
              setValue={setValue}
            />
          )}
          
          {activeTab === 'education' && (
            <EducationForm 
              register={register} 
              errors={errors} 
              educationArray={educationArray}
            />
          )}
          
          {activeTab === 'skills' && (
            <SkillsForm 
              register={register} 
              errors={errors} 
              skillGroupsArray={skillGroupsArray}
              getValues={getValues}
              setValue={setValue}
            />
          )}
          
          {activeTab === 'certifications' && (
            <CertificationsForm 
              register={register} 
              errors={errors} 
              certificationsArray={certificationsArray}
            />
          )}
          
          {/* Botón de guardar al final */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}