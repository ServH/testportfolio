import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResourceCategory, ResourceFormat, ResourceLevel } from "@/types";

/**
 * Combina clases CSS con tailwind-merge para evitar conflictos
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatea una fecha en formato legible
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Trunca un texto a una longitud máxima
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Obtiene la etiqueta para una categoría de recurso
 */
export function getCategoryLabel(category: ResourceCategory): string {
  switch (category) {
    case "material-didactico":
      return "Material Didáctico";
    case "actividades":
      return "Actividades";
    case "evaluacion":
      return "Evaluación";
    case "presentacion":
      return "Presentación";
    case "proyecto":
      return "Proyecto";
    default:
      return category;
  }
}

/**
 * Obtiene la etiqueta para un nivel educativo
 */
export function getLevelLabel(level: ResourceLevel): string {
  switch (level) {
    case "eso":
      return "ESO";
    case "bachillerato":
      return "Bachillerato";
    default:
      return level;
  }
}

/**
 * Obtiene la etiqueta para un formato de archivo
 */
export function getFormatLabel(format: ResourceFormat): string {
  switch (format) {
    case "pdf":
      return "PDF";
    case "doc":
      return "Word";
    case "ppt":
      return "PowerPoint";
    case "img":
      return "Imagen";
    default:
      return format;
  }
}

/**
 * Genera un ID único
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Valida un correo electrónico
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formatea un número de teléfono
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // Ejemplo: +34 600 00 00 00
  const cleaned = phoneNumber.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{2})(\d{2})(\d{2})$/);
  
  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
  }
  
  return phoneNumber;
}

/**
 * Limita el número de intentos de una función
 */
export function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  return new Promise((resolve, reject) => {
    const attempt = (retries: number) => {
      fn()
        .then(resolve)
        .catch((error) => {
          if (retries === 0) {
            return reject(error);
          }
          
          setTimeout(() => attempt(retries - 1), delay);
        });
    };
    
    attempt(maxRetries);
  });
}
