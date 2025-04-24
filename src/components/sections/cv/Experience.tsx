import { BriefcaseIcon } from '@heroicons/react/24/outline';

// Tipo para los elementos de experiencia
type ExperienceItem = {
  id: string;
  position: string;
  company: string;
  location: string;
  period: string;
  description: string[];
};

// Datos de experiencia
const experienceData: ExperienceItem[] = [
  {
    id: 'exp1',
    position: 'Profesora de Lengua y Literatura',
    company: 'I.E.S. Miguel de Cervantes',
    location: 'Madrid',
    period: 'Septiembre 2018 - Presente',
    description: [
      'Docencia en ESO y Bachillerato de Lengua Castellana y Literatura.',
      'Coordinadora del Departamento de Lengua desde 2020.',
      'Responsable del Club de Lectura y del periódico escolar.',
      'Tutora de grupos de 4º de ESO y 1º de Bachillerato.'
    ]
  },
  {
    id: 'exp2',
    position: 'Profesora de Lengua y Literatura',
    company: 'I.E.S. Antonio Machado',
    location: 'Toledo',
    period: 'Septiembre 2014 - Agosto 2018',
    description: [
      'Docencia en ESO de Lengua Castellana y Literatura.',
      'Participación en el programa de innovación educativa "Leer para Crecer".',
      'Colaboración en la adaptación curricular para alumnos con necesidades educativas especiales.',
      'Responsable de actividades culturales del centro.'
    ]
  },
  {
    id: 'exp3',
    position: 'Profesora de Español para Extranjeros',
    company: 'Academia Cervantes',
    location: 'Madrid',
    period: 'Enero 2012 - Agosto 2014',
    description: [
      'Enseñanza de español como lengua extranjera a adultos y jóvenes de distintas nacionalidades.',
      'Desarrollo de material didáctico para diferentes niveles (A1-C2).',
      'Organización de actividades culturales complementarias.'
    ]
  }
];

export function Experience() {
  return (
    <div className="mb-10">
      <h3 className="flex items-center text-xl font-serif font-semibold mb-6">
        <BriefcaseIcon className="h-6 w-6 text-primary-600 mr-2" />
        Experiencia Profesional
      </h3>
      
      <div className="space-y-8">
        {experienceData.map((item) => (
          <div key={item.id} className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
            {/* Indicador de periodo */}
            <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-primary-600"></div>
            
            <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">
              {item.period}
            </div>
            
            <h4 className="text-lg font-semibold">
              {item.position}
            </h4>
            
            <div className="text-base text-gray-700 dark:text-gray-300 mb-2">
              {item.company}, {item.location}
            </div>
            
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              {item.description.map((desc, index) => (
                <li key={index} className="content-paragraph">
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
