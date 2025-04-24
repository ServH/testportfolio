# Fase 2: Panel de Administración del Portfolio

Esta fase del proyecto implementa un panel de administración completo para que Paola pueda gestionar su portfolio profesional sin necesidad de conocimientos técnicos.

## Características Implementadas

### 1. Sistema de Autenticación
- Acceso seguro mediante usuario y contraseña
- Protección de rutas administrativas
- Gestión de sesiones con iron-session

### 2. Gestión de CV
- Edición de información personal
- Gestión de experiencia laboral
- Gestión de formación académica
- Gestión de habilidades
- Gestión de certificaciones

### 3. Gestión de Recursos Educativos
- Listado de recursos con ordenación y filtrado
- Creación de nuevos recursos
- Edición de recursos existentes
- Eliminación de recursos
- Subida de archivos (documentos, presentaciones, imágenes)
- Subida de imágenes de portada

### 4. Almacenamiento de Datos
- Sistema de archivos local para recursos estáticos
- Almacenamiento JSON para datos estructurados

## Estructura de Archivos

```
/data                     # Almacenamiento JSON
  ├─ cv.json              # Datos del CV 
  └─ resources.json       # Datos de los recursos

/public                   # Archivos estáticos públicos
  ├─ recursos
  │  ├─ documentos        # PDFs, DOCs, PPTs, etc.
  │  └─ imagenes          # Imágenes de portada de recursos
  └─ images
     └─ profile           # Imágenes de perfil

/src
  ├─ app
  │  ├─ admin             # Panel de administración
  │  │  ├─ cv             # Gestión del CV
  │  │  ├─ recursos       # Gestión de recursos
  │  │  │  ├─ [id]        # Edición de recurso específico
  │  │  │  └─ nuevo       # Creación de nuevo recurso
  │  │  └─ page.tsx       # Dashboard principal
  │  ├─ api               # API del backend
  │  │  ├─ auth           # Autenticación
  │  │  ├─ cv             # Endpoints del CV
  │  │  ├─ resources      # Endpoints de recursos
  │  │  └─ upload         # Endpoints para subida de archivos
  ├─ lib                  # Utilidades y servicios
  │  ├─ auth.ts           # Configuración de autenticación
  │  ├─ data.ts           # Gestión de datos
  │  └─ upload.ts         # Gestión de subida de archivos
```

## Guía de Uso

### Configuración Inicial

Antes de iniciar la aplicación, asegúrate de ejecutar:

```bash
npm run setup-storage
```

Este comando configura la estructura de directorios necesaria para el almacenamiento de archivos.

### Gestión de Recursos Educativos

#### Visualización de Recursos
- Accede a `/admin/recursos` para ver la lista completa de recursos
- Los recursos se muestran en formato tabla con opciones para editar y eliminar

#### Creación de Recursos
1. Haz clic en "Nuevo Recurso"
2. Completa el formulario con:
   - Título y descripción
   - Categoría (Material Didáctico, Actividades, Evaluación, etc.)
   - Nivel (ESO, Bachillerato)
   - Formato (PDF, Word, PowerPoint, Imagen)
3. Sube el archivo del recurso (documento o material)
4. Sube una imagen de portada
5. Guarda el recurso

#### Edición de Recursos
1. Haz clic en el icono de edición junto al recurso deseado
2. Modifica los campos necesarios
3. Puedes subir nuevos archivos o mantener los existentes
4. Guarda los cambios

#### Eliminación de Recursos
1. Haz clic en el icono de eliminar junto al recurso
2. Confirma la eliminación en el diálogo de confirmación

## Especificaciones Técnicas

### Subida de Archivos
- La plataforma soporta archivos PDF, Word, PowerPoint e imágenes
- Las imágenes de portada se redimensionan automáticamente
- Los archivos se almacenan con nombres únicos para evitar colisiones
- Se aplican validaciones de tipo y tamaño de archivo

### Datos y Persistencia
- Los datos se almacenan en archivos JSON para facilitar la portabilidad
- La estructura está diseñada para ser ligera y eficiente
- Los cambios se guardan inmediatamente al realizar operaciones

### Seguridad
- Protección de rutas administrativas mediante middleware
- Validación de formularios en cliente y servidor
- Sanitización de datos de entrada
- Generación segura de IDs únicos para recursos

## Mantenimiento

### Copias de Seguridad
Se recomienda realizar copias de seguridad periódicas de:
- Directorio `/data`
- Directorios de recursos en `/public/recursos`

### Limpieza
Para optimizar el espacio de almacenamiento, considera:
- Eliminar recursos obsoletos mediante la interfaz
- Revisar periódicamente los archivos subidos

## Desarrollo Futuro

Posibles mejoras para futuras versiones:
- Migración a una base de datos relacional
- Sistema de etiquetas para recursos
- Búsqueda avanzada de recursos
- Estadísticas de uso de recursos
- Vista previa integrada de documentos
