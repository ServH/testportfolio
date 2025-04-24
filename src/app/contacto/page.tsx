import { ContactForm } from '@/components/sections/contact/ContactForm';
import { ContactInfo } from '@/components/sections/contact/ContactInfo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto - Portfolio Profesional Docente',
  description: 'Ponte en contacto conmigo para consultas, colaboraciones o propuestas educativas',
};

export default function ContactPage() {
  return (
    <div className="container-custom pt-24 my-8"> {/* Añadido pt-24 para evitar solapamiento */}
      <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Contacto</h1>
      
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <p className="content-paragraph text-lg mb-6">
            Si tienes alguna <span className="tdh-helper">pregunta</span>, propuesta de 
            <span className="tdh-helper">colaboración</span> o simplemente quieres 
            <span className="tdh-helper">compartir</span> tus impresiones sobre mi trabajo, no 
            <span className="tdh-helper">dudes</span> en ponerte en contacto conmigo.
          </p>
          
          <p className="content-paragraph mb-10">
            Estoy siempre <span className="tdh-helper">interesada</span> en nuevas ideas, 
            proyectos educativos y <span className="tdh-helper">oportunidades</span> para seguir 
            <span className="tdh-helper">creciendo</span> como profesional de la educación.
          </p>
          
          <ContactInfo />
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-serif font-semibold mb-6">Envíame un mensaje</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
