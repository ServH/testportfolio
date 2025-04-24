import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-10">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sección 1: Información de contacto */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Ana María García</h3>
            <p className="text-sm mb-2">Profesora de Lengua y Literatura</p>
            <p className="text-sm mb-2">I.E.S. Miguel de Cervantes</p>
            <p className="text-sm mb-2">Madrid, España</p>
          </div>
          
          {/* Sección 2: Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-primary-600 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/cv" className="text-sm hover:text-primary-600 transition-colors">
                  Curriculum Vitae
                </Link>
              </li>
              <li>
                <Link href="/recursos" className="text-sm hover:text-primary-600 transition-colors">
                  Recursos Educativos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm hover:text-primary-600 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Sección 3: Conecta conmigo */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Conecta conmigo</h3>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary-600 transition-colors"
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
                className="hover:text-primary-600 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a 
                href="mailto:contacto@example.com" 
                className="hover:text-primary-600 transition-colors"
                aria-label="Email"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} Ana María García. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Desarrollado con Next.js y TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  );
}
