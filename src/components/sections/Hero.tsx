'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center">
      {/* Fondo con overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-secondary-900/90">
        {/* En una implementación real, esto sería una imagen */}
        <div className="absolute inset-0 opacity-30 bg-[url('/images/hero-background.jpg')] bg-cover bg-center" />
      </div>
      
      <div className="container-custom relative z-10 mx-auto px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            <span className="tdh-helper">Ana</span> María García
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-white/90 mb-8">
            <span className="tdh-helper">Profesora</span> de Lengua y Literatura en <span className="tdh-helper">Secundaria</span>
          </h2>
          
          <p className="text-xl text-white/80 mb-10 max-w-2xl">
            <span className="tdh-helper">Comprometida</span> con una educación <span className="tdh-helper">innovadora</span>, 
            <span className="tdh-helper">accesible</span> e <span className="tdh-helper">inclusiva</span> para todos mis alumnos.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/cv" 
              className="btn btn-primary text-center"
            >
              Ver Curriculum
            </Link>
            <Link 
              href="/recursos" 
              className="btn btn-outline bg-white/10 text-white border-white/30 hover:bg-white/20 text-center"
            >
              Explorar Recursos
            </Link>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg 
            className="w-6 h-10 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
