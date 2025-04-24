import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface CVHeaderProps {
  name: string;
  title: string;
  specialization: string;
}

export function CVHeader({ name, title, specialization }: CVHeaderProps) {
  return (
    <div className="bg-primary-600 text-white p-6 md:p-8">
      <div className="grid md:grid-cols-3 gap-6 items-center">
        {/* Foto de perfil */}
        <div className="flex justify-center md:justify-start">
          <div className="h-36 w-36 rounded-full bg-white/10 overflow-hidden flex items-center justify-center">
            {/* En una implementación real, esto sería una imagen */}
            <div className="text-6xl font-serif font-bold opacity-70">
              {name.split(' ').map(word => word[0]).join('')}
            </div>
          </div>
        </div>
        
        {/* Información principal */}
        <div className="text-center md:text-left md:col-span-2">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            {name}
          </h2>
          
          <div className="mt-2 text-xl text-white/90">
            {title}
          </div>
          
          <div className="mt-1 text-white/80">
            {specialization}
          </div>
        </div>
      </div>
      
      {/* Información de contacto */}
      <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center">
          <EnvelopeIcon className="h-5 w-5 text-white/70 mr-2" />
          <span className="text-sm">contacto@example.com</span>
        </div>
        
        <div className="flex items-center">
          <PhoneIcon className="h-5 w-5 text-white/70 mr-2" />
          <span className="text-sm">+34 600 00 00 00</span>
        </div>
        
        <div className="flex items-center">
          <MapPinIcon className="h-5 w-5 text-white/70 mr-2" />
          <span className="text-sm">Madrid, España</span>
        </div>
      </div>
    </div>
  );
}
