import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Path al archivo de datos
const DATA_PATH = path.join(process.cwd(), 'data');
const CV_FILE = path.join(DATA_PATH, 'cv.json');
const RESOURCES_FILE = path.join(DATA_PATH, 'resources.json');

// Tipos para CV
export type Experience = {
  id: string;
  position: string;
  company: string;
  location: string;
  period: string;
  description: string[];
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description?: string;
};

export type Skill = {
  id: string;
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
};

export type SkillGroup = {
  id: string;
  name: string;
  skills: Skill[];
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
};

// Tipo para los datos del CV
export type CVData = {
  personal: {
    name: string;
    title: string;
    specialization: string;
    email: string;
    phone: string;
    location: string;
  };
  about: string;
  experience: Experience[];
  education: Education[];
  skillGroups: SkillGroup[];
  certifications: Certification[];
};

// Tipo para recursos
export type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  format: string;
  thumbnail: string;
  downloadUrl: string;
};

// Asegurarse de que el directorio de datos existe
async function ensureDataDir() {
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.mkdir(DATA_PATH, { recursive: true });
  }
}

// Datos iniciales para CV
const defaultCVData: CVData = {
  personal: {
    name: 'Paola Hernandez Tarrega',
    title: 'Profesora de Secundaria',
    specialization: 'Centro Educativo Salesianos San Juan Bosco',
    email: 'contacto@example.com',
    phone: '+34 600 00 00 00',
    location: 'Valencia, España',
  },
  about: 'Soy profesora de Secundaria en el Centro Educativo Salesianos San Juan Bosco con más de diez años de experiencia docente. Mi formación académica y experiencia me han proporcionado las herramientas necesarias para crear un entorno de aprendizaje estimulante e inclusivo.',
  experience: [
    {
      id: 'exp1',
      position: 'Profesora de Secundaria',
      company: 'Centro Educativo Salesianos San Juan Bosco',
      location: 'Valencia',
      period: 'Septiembre 2018 - Presente',
      description: [
        'Docencia en ESO y Bachillerato en varias asignaturas.',
        'Coordinadora del Departamento desde 2020.',
        'Responsable de actividades extraescolares.',
        'Tutora de grupos de 4º de ESO y 1º de Bachillerato.'
      ]
    },
    {
      id: 'exp2',
      position: 'Profesora de Secundaria',
      company: 'IES Antonio Machado',
      location: 'Valencia',
      period: 'Septiembre 2014 - Agosto 2018',
      description: [
        'Docencia en ESO en varias asignaturas.',
        'Participación en programas de innovación educativa.',
        'Colaboración en adaptaciones curriculares.',
        'Responsable de actividades culturales del centro.'
      ]
    }
  ],
  education: [
    {
      id: 'edu1',
      degree: 'Máster en Formación del Profesorado',
      institution: 'Universidad de Valencia',
      location: 'Valencia',
      period: '2013 - 2014',
      description: 'Especialidad en Educación Secundaria. Trabajo fin de máster sobre innovación metodológica.'
    },
    {
      id: 'edu2',
      degree: 'Licenciatura en Historia',
      institution: 'Universidad de Valencia',
      location: 'Valencia',
      period: '2008 - 2013'
    }
  ],
  skillGroups: [
    {
      id: 'pedagogical',
      name: 'Competencias Pedagógicas',
      skills: [
        { id: 'teaching', name: 'Metodologías de Enseñanza', level: 5 },
        { id: 'curriculum', name: 'Diseño Curricular', level: 4 },
        { id: 'assessment', name: 'Evaluación Educativa', level: 5 }
      ]
    },
    {
      id: 'tech',
      name: 'Competencias Tecnológicas',
      skills: [
        { id: 'office', name: 'Herramientas Office', level: 5 },
        { id: 'elearning', name: 'Plataformas E-learning', level: 4 }
      ]
    }
  ],
  certifications: [
    {
      id: 'cert1',
      name: 'Certificado en Tecnologías Educativas',
      issuer: 'Ministerio de Educación',
      date: '2020'
    },
    {
      id: 'cert2',
      name: 'B2 English Certification',
      issuer: 'Cambridge Assessment English',
      date: '2019'
    }
  ]
};

// Datos iniciales para recursos
const defaultResources: Resource[] = [
  {
    id: '1',
    title: 'Guía de Historia Contemporánea',
    description: 'Una guía completa para ayudar a los estudiantes a entender los principales acontecimientos históricos',
    category: 'material-didactico',
    level: 'eso',
    format: 'pdf',
    thumbnail: '/recursos/imagenes/guia-historia.jpg',
    downloadUrl: '/recursos/documentos/guia-historia-contemporanea.pdf',
  },
  {
    id: '2',
    title: 'Actividades de Geografía',
    description: 'Colección de ejercicios prácticos para reforzar conceptos geográficos',
    category: 'actividades',
    level: 'eso',
    format: 'pdf',
    thumbnail: '/recursos/imagenes/actividades-geografia.jpg',
    downloadUrl: '/recursos/documentos/actividades-geografia.pdf',
  }
];

// Clase para gestionar los datos del portfolio
class PortfolioData {
  // Cargar datos del CV
  async getCV(): Promise<CVData> {
    try {
      await ensureDataDir();
      
      try {
        await fs.access(CV_FILE);
        const data = await fs.readFile(CV_FILE, 'utf-8');
        return JSON.parse(data);
      } catch {
        // Si el archivo no existe, crear uno con datos por defecto
        await fs.writeFile(CV_FILE, JSON.stringify(defaultCVData, null, 2));
        return defaultCVData;
      }
    } catch (error) {
      console.error('Error al cargar datos del CV:', error);
      return defaultCVData;
    }
  }

  // Guardar datos del CV
  async saveCV(data: CVData): Promise<CVData> {
    try {
      await ensureDataDir();
      await fs.writeFile(CV_FILE, JSON.stringify(data, null, 2));
      return data;
    } catch (error) {
      console.error('Error al guardar datos del CV:', error);
      throw error;
    }
  }

  // Cargar recursos
  async getResources(): Promise<Resource[]> {
    try {
      await ensureDataDir();
      
      try {
        await fs.access(RESOURCES_FILE);
        const data = await fs.readFile(RESOURCES_FILE, 'utf-8');
        return JSON.parse(data);
      } catch {
        // Si el archivo no existe, crear uno con datos por defecto
        await fs.writeFile(RESOURCES_FILE, JSON.stringify(defaultResources, null, 2));
        return defaultResources;
      }
    } catch (error) {
      console.error('Error al cargar recursos:', error);
      return defaultResources;
    }
  }

  // Guardar recursos
  async saveResources(resources: Resource[]): Promise<Resource[]> {
    try {
      await ensureDataDir();
      await fs.writeFile(RESOURCES_FILE, JSON.stringify(resources, null, 2));
      return resources;
    } catch (error) {
      console.error('Error al guardar recursos:', error);
      throw error;
    }
  }

  // Añadir un nuevo recurso
  async addResource(resource: Omit<Resource, 'id'>): Promise<Resource> {
    const resources = await this.getResources();
    const newResource = {
      ...resource,
      id: uuidv4(), // Generar ID único
    };
    
    resources.push(newResource);
    await this.saveResources(resources);
    
    return newResource;
  }

  // Actualizar un recurso existente
  async updateResource(id: string, data: Partial<Resource>): Promise<Resource | null> {
    const resources = await this.getResources();
    const index = resources.findIndex(r => r.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const updatedResource = {
      ...resources[index],
      ...data,
      id, // Asegurar que el ID no cambia
    };
    
    resources[index] = updatedResource;
    await this.saveResources(resources);
    
    return updatedResource;
  }

  // Eliminar un recurso
  async deleteResource(id: string): Promise<boolean> {
    const resources = await this.getResources();
    const filteredResources = resources.filter(r => r.id !== id);
    
    if (filteredResources.length === resources.length) {
      return false; // No se encontró el recurso para eliminar
    }
    
    await this.saveResources(filteredResources);
    return true;
  }
}

// Exportar una instancia singleton del servicio
export const portfolioData = new PortfolioData();
