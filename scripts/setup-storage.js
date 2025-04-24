#!/usr/bin/env node

/**
 * Este script configura la estructura de directorios necesaria para almacenar
 * archivos estáticos como documentos, imágenes, etc.
 */

const fs = require('fs');
const path = require('path');

// Configuración de directorios
const DIRS = {
  // Directorio base para datos JSON
  data: path.join(process.cwd(), 'data'),
  
  // Directorios para archivos estáticos públicos
  public: {
    // Directorios para recursos educativos
    recursos: {
      documentos: path.join(process.cwd(), 'public', 'recursos', 'documentos'),
      imagenes: path.join(process.cwd(), 'public', 'recursos', 'imagenes'),
    },
    
    // Directorio para imágenes de perfil
    profile: path.join(process.cwd(), 'public', 'images', 'profile'),
  },
  
  // Directorio temporal para subidas
  temp: path.join(process.cwd(), 'tmp'),
};

/**
 * Crea un directorio si no existe
 * @param {string} dir - Ruta del directorio
 */
function createDirIfNotExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Directorio creado: ${dir}`);
  } else {
    console.log(`✓ Directorio ya existe: ${dir}`);
  }
}

/**
 * Configura todos los directorios necesarios
 */
function setupDirectories() {
  console.log('Configurando directorios de almacenamiento...\n');
  
  // Crear directorio de datos
  createDirIfNotExists(DIRS.data);
  
  // Crear directorios para recursos
  createDirIfNotExists(DIRS.public.recursos.documentos);
  createDirIfNotExists(DIRS.public.recursos.imagenes);
  
  // Crear directorio para imágenes de perfil
  createDirIfNotExists(DIRS.public.profile);
  
  // Crear directorio temporal
  createDirIfNotExists(DIRS.temp);
  
  console.log('\n¡Configuración completada!');
}

// Ejecutar configuración
setupDirectories();
