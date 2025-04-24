'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            {/* Información de contacto */}
            <div className="bg-primary-700 text-white p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
                Ponte en contacto
              </h2>
              
              <p className="mb-8">
                Si estás interesado en mi trabajo o tienes alguna propuesta de colaboración, no dudes en contactarme.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <EnvelopeIcon className="h-6 w-6 text-primary-200" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-primary-200">
                      Correo electrónico
                    </p>
                    <a 
                      href="mailto:contacto@example.com" 
                      className="text-white hover:text-primary-100"
                    >
                      contacto@example.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <PhoneIcon className="h-6 w-6 text-primary-200" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-primary-200">
                      Teléfono
                    </p>
                    <p className="text-white">
                      +34 600 00 00 00
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPinIcon className="h-6 w-6 text-primary-200" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-primary-200">
                      Ubicación
                    </p>
                    <p className="text-white">
                      Madrid, España
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-lg font-semibold mb-4">
                  Sígueme en redes sociales
                </h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary-200 transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary-200 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Call to action */}
            <div className="p-8 md:p-12">
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-2xl font-serif font-semibold mb-6">
                  ¿Quieres saber más?
                </h3>
                
                <p className="content-paragraph mb-8">
                  <span className="tdh-helper">Visita</span> mi página de contacto para enviarme un 
                  <span className="tdh-helper">mensaje</span> directamente o para obtener 
                  <span className="tdh-helper">información</span> más detallada sobre cómo 
                  <span className="tdh-helper">colaborar</span> conmigo.
                </p>
                
                <div className="mt-auto">
                  <Link 
                    href="/contacto" 
                    className="btn btn-primary inline-flex items-center"
                  >
                    Página de contacto
                    <svg 
                      className="ml-2 h-4 w-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
