import { CheckBadgeIcon } from '@heroicons/react/24/outline';

// Tipo para certificación
type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
};

// Datos de certificaciones
const certificationsData: Certification[] = [
  {
    id: 'cert1',
    name: 'Certificado de Aptitud Pedagógica en Tecnologías Educativas',
    issuer: 'Ministerio de Educación',
    date: '2020'
  },
  {
    id: 'cert2',
    name: 'B2 English Certification',
    issuer: 'Cambridge Assessment English',
    date: '2019'
  },
  {
    id: 'cert3',
    name: 'Formación en Aprendizaje Basado en Proyectos',
    issuer: 'Universidad Internacional de La Rioja',
    date: '2017'
  },
  {
    id: 'cert4',
    name: 'Curso de Especialización en Educación Inclusiva',
    issuer: 'Fundación Educación y Desarrollo',
    date: '2018'
  },
  {
    id: 'cert5',
    name: 'Formación en Evaluación por Competencias',
    issuer: 'Instituto de Ciencias de la Educación',
    date: '2016'
  }
];

export function Certifications() {
  return (
    <div className="mb-10">
      <h3 className="flex items-center text-xl font-serif font-semibold mb-6">
        <CheckBadgeIcon className="h-6 w-6 text-primary-600 mr-2" />
        Certificaciones y Cursos
      </h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        {certificationsData.map((cert) => (
          <div 
            key={cert.id}
            className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md border border-gray-200 dark:border-gray-700"
          >
            <div className="text-primary-700 dark:text-primary-400 font-medium">
              {cert.name}
            </div>
            
            <div className="mt-1 flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {cert.issuer}
              </span>
              <span className="text-gray-500 dark:text-gray-500">
                {cert.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
