'use client';

import { UseFormRegister, FieldErrors, UseFieldArrayReturn, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { CVData, SkillGroup, Skill } from '@/lib/data';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface SkillsFormProps {
  register: UseFormRegister<CVData>;
  errors: FieldErrors<CVData>;
  skillGroupsArray: UseFieldArrayReturn<CVData, 'skillGroups', 'id'>;
  getValues: UseFormGetValues<CVData>;
  setValue: UseFormSetValue<CVData>;
}

export default function SkillsForm({ 
  register, 
  errors, 
  skillGroupsArray,
  getValues,
  setValue
}: SkillsFormProps) {
  const { fields, append, remove } = skillGroupsArray;
  
  // Añade un nuevo grupo de habilidades
  const addNewSkillGroup = () => {
    append({
      id: crypto.randomUUID(),
      name: '',
      skills: [],
    } as SkillGroup);
  };
  
  // Función para añadir una nueva habilidad a un grupo específico
  const addSkillToGroup = (groupIndex: number) => {
    const currentSkillGroups = getValues('skillGroups');
    const updatedSkillGroups = [...currentSkillGroups];
    
    if (updatedSkillGroups[groupIndex]) {
      if (!updatedSkillGroups[groupIndex].skills) {
        updatedSkillGroups[groupIndex].skills = [];
      }
      
      updatedSkillGroups[groupIndex].skills.push({
        id: crypto.randomUUID(),
        name: '',
        level: 3,
      } as Skill);
      
      setValue('skillGroups', updatedSkillGroups);
    }
  };
  
  // Función para eliminar una habilidad de un grupo
  const removeSkillFromGroup = (groupIndex: number, skillIndex: number) => {
    const currentSkillGroups = getValues('skillGroups');
    const updatedSkillGroups = [...currentSkillGroups];
    
    if (updatedSkillGroups[groupIndex] && updatedSkillGroups[groupIndex].skills) {
      updatedSkillGroups[groupIndex].skills.splice(skillIndex, 1);
      setValue('skillGroups', updatedSkillGroups);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Habilidades
        </h3>
        <button
          type="button"
          onClick={addNewSkillGroup}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusIcon className="h-5 w-5 mr-1" /> Añadir grupo
        </button>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
        {fields.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No hay grupos de habilidades añadidos. Haz clic en "Añadir grupo" para comenzar.
          </p>
        ) : (
          <div className="space-y-8">
            {fields.map((group, groupIndex) => (
              <div key={group.id} className="relative bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <button
                  type="button"
                  onClick={() => remove(groupIndex)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              
                <div className="mt-4 space-y-6">
                  {/* Nombre del grupo */}
                  <div>
                    <label htmlFor={`skillGroups.${groupIndex}.name`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nombre del grupo
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        {...register(`skillGroups.${groupIndex}.name` as const, { required: 'El nombre del grupo es obligatorio' })}
                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                      />
                    </div>
                  </div>
                  
                  {/* Habilidades dentro del grupo */}
                  <div>
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Habilidades
                      </label>
                      <button
                        type="button"
                        onClick={() => addSkillToGroup(groupIndex)}
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm"
                      >
                        + Añadir habilidad
                      </button>
                    </div>
                    
                    <div className="mt-2 space-y-3">
                      {getValues(`skillGroups.${groupIndex}.skills`)?.map((_, skillIndex) => (
                        <div key={skillIndex} className="flex items-center space-x-4">
                          <div className="flex-grow">
                            <input
                              type="text"
                              placeholder="Nombre de la habilidad"
                              {...register(`skillGroups.${groupIndex}.skills.${skillIndex}.name` as const, { required: 'El nombre de la habilidad es obligatorio' })}
                              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                            />
                          </div>
                          
                          <div className="w-32">
                            <select
                              {...register(`skillGroups.${groupIndex}.skills.${skillIndex}.level` as const, { required: true })}
                              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md"
                            >
                              <option value="1">Nivel 1</option>
                              <option value="2">Nivel 2</option>
                              <option value="3">Nivel 3</option>
                              <option value="4">Nivel 4</option>
                              <option value="5">Nivel 5</option>
                            </select>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => removeSkillFromGroup(groupIndex, skillIndex)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      
                      {!getValues(`skillGroups.${groupIndex}.skills`) || 
                       getValues(`skillGroups.${groupIndex}.skills`).length === 0 && (
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          No hay habilidades añadidas en este grupo. Añade al menos una.
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