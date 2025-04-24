'use client';

import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Maneja cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Actualiza los datos del formulario
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpia el error del campo cuando el usuario escribe
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Valida el formulario
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };
    
    // Validación del nombre
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
      isValid = false;
    }
    
    // Validación del email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
      isValid = false;
    }
    
    // Validación del mensaje
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulamos una petición de envío
    setTimeout(() => {
      // En una implementación real, aquí se enviaría el formulario a un backend
      
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Resetea el formulario después de un envío exitoso
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Resetea el estado después de unos segundos
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Mensaje de estado */}
      {submitStatus === 'success' && (
        <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md">
          Tu mensaje ha sido enviado correctamente. Me pondré en contacto contigo lo antes posible.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
          Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.
        </div>
      )}
      
      {/* Campos del formulario */}
      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-medium mb-1"
        >
          Nombre <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full rounded-md px-3 py-2 border ${
            errors.name 
              ? 'border-red-500 dark:border-red-400' 
              : 'border-gray-300 dark:border-gray-600'
          } focus-ring bg-white dark:bg-gray-700`}
          disabled={isSubmitting}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.name}
          </p>
        )}
      </div>
      
      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium mb-1"
        >
          Email <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full rounded-md px-3 py-2 border ${
            errors.email 
              ? 'border-red-500 dark:border-red-400' 
              : 'border-gray-300 dark:border-gray-600'
          } focus-ring bg-white dark:bg-gray-700`}
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.email}
          </p>
        )}
      </div>
      
      <div>
        <label 
          htmlFor="subject" 
          className="block text-sm font-medium mb-1"
        >
          Asunto
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full rounded-md px-3 py-2 border border-gray-300 dark:border-gray-600 focus-ring bg-white dark:bg-gray-700"
          disabled={isSubmitting}
        >
          <option value="">Selecciona un asunto</option>
          <option value="consulta">Consulta</option>
          <option value="colaboracion">Propuesta de colaboración</option>
          <option value="recursos">Recursos educativos</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      
      <div>
        <label 
          htmlFor="message" 
          className="block text-sm font-medium mb-1"
        >
          Mensaje <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full rounded-md px-3 py-2 border ${
            errors.message 
              ? 'border-red-500 dark:border-red-400' 
              : 'border-gray-300 dark:border-gray-600'
          } focus-ring bg-white dark:bg-gray-700`}
          disabled={isSubmitting}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        ></textarea>
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.message}
          </p>
        )}
      </div>
      
      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn btn-primary py-2"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
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
              Enviando...
            </span>
          ) : (
            'Enviar mensaje'
          )}
        </button>
      </div>
    </form>
  );
}
