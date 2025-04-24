import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import formidable from 'formidable';
import { NextRequest } from 'next/server';

// Directorios para archivos
const UPLOADS_DIR = path.join(process.cwd(), 'public');
const DOCUMENTS_DIR = path.join(UPLOADS_DIR, 'recursos', 'documentos');
const IMAGES_DIR = path.join(UPLOADS_DIR, 'recursos', 'imagenes');
const PROFILE_DIR = path.join(UPLOADS_DIR, 'images', 'profile');

// Tipos de archivos permitidos
type FileType = 'document' | 'image' | 'profile';

// Asegurarse de que el directorio exista
async function ensureDir(dir: string) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

// Obtener la extensión de un archivo
function getExtension(filename: string): string {
  return path.extname(filename).toLowerCase();
}

// Obtener el MIME type basado en la extensión
function getMimeType(ext: string): string {
  const mimeTypes: Record<string, string> = {
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  };
  
  return mimeTypes[ext] || 'application/octet-stream';
}

// Validar un archivo según su tipo
function validateFile(filename: string, type: FileType): boolean {
  const ext = getExtension(filename);
  
  switch (type) {
    case 'document':
      return ['.pdf', '.doc', '.docx', '.ppt', '.pptx'].includes(ext);
    case 'image':
    case 'profile':
      return ['.jpg', '.jpeg', '.png', '.gif', '.svg'].includes(ext);
    default:
      return false;
  }
}

// Guardar un archivo
export async function saveFile(file: formidable.File, type: FileType): Promise<string> {
  if (!validateFile(file.originalFilename || '', type)) {
    throw new Error('Tipo de archivo no permitido');
  }
  
  let targetDir: string;
  let publicPath: string;
  
  // Determinar el directorio según el tipo
  switch (type) {
    case 'document':
      targetDir = DOCUMENTS_DIR;
      publicPath = '/recursos/documentos';
      break;
    case 'image':
      targetDir = IMAGES_DIR;
      publicPath = '/recursos/imagenes';
      break;
    case 'profile':
      targetDir = PROFILE_DIR;
      publicPath = '/images/profile';
      break;
    default:
      throw new Error('Tipo de archivo no válido');
  }
  
  // Asegurar que el directorio existe
  await ensureDir(targetDir);
  
  // Generar un nombre único para el archivo
  const ext = getExtension(file.originalFilename || '');
  const newFilename = `${uuidv4()}${ext}`;
  const filePath = path.join(targetDir, newFilename);
  
  // Leer el archivo temporal y guardarlo en su destino final
  const content = await fs.readFile(file.filepath);
  await fs.writeFile(filePath, content);
  
  // Eliminar el archivo temporal
  await fs.unlink(file.filepath);
  
  // Devolver la ruta pública del archivo
  return `${publicPath}/${newFilename}`;
}

// Procesar la subida de un archivo
export async function processFileUpload(req: NextRequest, type: FileType): Promise<string> {
  return new Promise((resolve, reject) => {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'tmp'),
      filename: () => uuidv4(),
      keepExtensions: true,
      multiples: false,
    });
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(new Error('Error al procesar el archivo'));
        return;
      }
      
      const file = files.file;
      
      if (!file || Array.isArray(file)) {
        reject(new Error('Archivo no válido'));
        return;
      }
      
      try {
        const filePath = await saveFile(file, type);
        resolve(filePath);
      } catch (error) {
        reject(error);
      }
    });
  });
}

// Exportar funciones útiles
export default {
  saveFile,
  processFileUpload,
};
