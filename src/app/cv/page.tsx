import { CVHeader } from '@/components/sections/cv/CVHeader';
import { Education } from '@/components/sections/cv/Education';
import { Experience } from '@/components/sections/cv/Experience';
import { CVSkills } from '@/components/sections/cv/CVSkills';
import { Certifications } from '@/components/sections/cv/Certifications';
import { DownloadButton } from '@/components/ui/DownloadButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Curriculum Vitae - Portfolio Profesional Docente',
  description: 'Curriculum Vitae detallado con experiencia laboral, formación académica y habilidades',
};

export default function CVPage() {
  return (
    <div className="container-custom my-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-serif font-bold">Curriculum Vitae</h1>
        <DownloadButton />
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <CVHeader 
          name="Paola Hernandez Tarrega"
          title="Profesora de Secundaria"
          specialization="Centro Educativo Salesianos San Juan Bosco" 
        />
        
        <div className="p-6 md:p-8 space-y-8">
          <Experience />
          <Education />
          <CVSkills />
          <Certifications />
        </div>
      </div>
    </div>
  );
}
