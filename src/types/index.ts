// Tipos comunes para toda la aplicación

// Tipo para los recursos educativos
export type Resource = {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  level: ResourceLevel;
  format: ResourceFormat;
  thumbnail: string;
  downloadUrl: string;
};

// Categorías de recursos
export type ResourceCategory = 
  | 'material-didactico'
  | 'actividades'
  | 'evaluacion'
  | 'presentacion'
  | 'proyecto';

// Niveles educativos
export type ResourceLevel = 
  | 'eso'
  | 'bachillerato';

// Formatos de archivo
export type ResourceFormat = 
  | 'pdf'
  | 'doc'
  | 'ppt'
  | 'img';

// Tipo para habilidades profesionales
export type Skill = {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode;
};

// Tipo para experiencia laboral
export type Experience = {
  id: string;
  position: string;
  company: string;
  location: string;
  period: string;
  description: string[];
};

// Tipo para formación académica
export type Education = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description?: string;
};

// Tipo para certificaciones
export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
};

// Tipo para formulario de contacto
export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// Estado de envío del formulario
export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';
