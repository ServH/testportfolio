'use client';

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export function DownloadButton() {
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Función que simularía la descarga del CV
  const handleDownload = () => {
    setIsDownloading(true);
    
    // Simulamos una carga con un timeout
    setTimeout(() => {
      // En una implementación real, aquí se generaría/descargaría el PDF
      
      // Crear un enlace para descargar (esto es demostrativo)
      const link = document.createElement('a');
      link.href = '/CV_Ana_Maria_Garcia.pdf'; // Ruta al archivo (simulado)
      link.download = 'CV_Ana_Maria_Garcia.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsDownloading(false);
    }, 1000);
  };
  
  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="btn btn-primary inline-flex items-center"
      aria-label="Descargar CV en PDF"
    >
      {isDownloading ? (
        <>
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Descargando...
        </>
      ) : (
        <>
          <ArrowDownTrayIcon className="mr-2 h-4 w-4" />
          Descargar PDF
        </>
      )}
    </button>
  );
}
