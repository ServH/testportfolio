import { StarIcon } from '@heroicons/react/24/outline';

// Tipo para grupos de habilidades
type SkillGroup = {
  id: string;
  name: string;
  skills: Skill[];
};

// Tipo para habilidades individuales
type Skill = {
  id: string;
  name: string;
  level: 1 | 2 | 3 | 4 | 5; // Nivel de 1 a 5
};

// Datos de habilidades
const skillsData: SkillGroup[] = [
  {
    id: 'pedagogical',
    name: 'Competencias Pedagógicas',
    skills: [
      { id: 'teaching', name: 'Metodologías de Enseñanza', level: 5 },
      { id: 'curriculum', name: 'Diseño Curricular', level: 4 },
      { id: 'assessment', name: 'Evaluación Educativa', level: 5 },
      { id: 'inclusion', name: 'Educación Inclusiva', level: 4 },
      { id: 'classroom', name: 'Gestión del Aula', level: 5 },
    ]
  },
  {
    id: 'tech',
    name: 'Competencias Tecnológicas',
    skills: [
      { id: 'office', name: 'Herramientas Office', level: 5 },
      { id: 'elearning', name: 'Plataformas E-learning', level: 4 },
      { id: 'multimedia', name: 'Creación Multimedia', level: 3 },
      { id: 'social', name: 'Redes Sociales Educativas', level: 4 },
      { id: 'tools', name: 'Herramientas Digitales Educativas', level: 4 },
    ]
  },
  {
    id: 'languages',
    name: 'Idiomas',
    skills: [
      { id: 'spanish', name: 'Español', level: 5 },
      { id: 'english', name: 'Inglés', level: 4 },
      { id: 'french', name: 'Francés', level: 3 },
    ]
  }
];

export function CVSkills() {
  // Función para renderizar los indicadores de nivel
  const renderSkillLevel = (level: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <div 
            key={value}
            className={`h-2 w-5 rounded-sm ${
              value <= level 
                ? 'bg-primary-600' 
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mb-10">
      <h3 className="flex items-center text-xl font-serif font-semibold mb-6">
        <StarIcon className="h-6 w-6 text-primary-600 mr-2" />
        Habilidades
      </h3>
      
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
        {skillsData.map((group) => (
          <div key={group.id}>
            <h4 className="text-lg font-semibold mb-4">
              {group.name}
            </h4>
            
            <div className="space-y-4">
              {group.skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-gray-700 dark:text-gray-300">
                      {skill.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {skill.level}/5
                    </div>
                  </div>
                  
                  {renderSkillLevel(skill.level)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
