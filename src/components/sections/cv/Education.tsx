import { AcademicCapIcon } from '@heroicons/react/24/outline';

// Tipo para los elementos de educación
type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description?: string;
};

// Datos de educación
const educationData: EducationItem[] = [
  {
    id: 'edu1',
    degree: 'Máster en Formación del Profesorado',
    institution: 'Universidad Complutense de Madrid',
    location: 'Madrid',
    period: '2011 - 2012',
    description: 'Especialidad en Lengua Castellana y Literatura. Trabajo fin de máster sobre innovación metodológica en la enseñanza de la literatura.'
  },
  {
    id: 'edu2',
    degree: 'Licenciatura en Filología Hispánica',
    institution: 'Universidad de Salamanca',
    location: 'Salamanca',
    period: '2006 - 2011',
    description: 'Especialización en Literatura Contemporánea. Premio Extraordinario de Licenciatura por el trabajo sobre poesía española actual.'
  },
  {
    id: 'edu3',
    degree: 'Certificado de Aptitud Pedagógica',
    institution: 'Universidad de Salamanca',
    location: 'Salamanca',
    period: '2011',
  }
];

export function Education() {
  return (
    <div className="mb-10">
      <h3 className="flex items-center text-xl font-serif font-semibold mb-6">
        <AcademicCapIcon className="h-6 w-6 text-primary-600 mr-2" />
        Formación Académica
      </h3>
      
      <div className="space-y-6">
        {educationData.map((item) => (
          <div key={item.id} className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
            {/* Indicador de periodo */}
            <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-primary-600"></div>
            
            <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">
              {item.period}
            </div>
            
            <h4 className="text-lg font-semibold">
              {item.degree}
            </h4>
            
            <div className="text-base text-gray-700 dark:text-gray-300 mb-2">
              {item.institution}, {item.location}
            </div>
            
            {item.description && (
              <p className="content-paragraph text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
