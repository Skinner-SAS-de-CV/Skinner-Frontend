# Skinner Frontend

## Resumen

Este es un sistema de reclutamiento llamado **Skinner** que utiliza inteligencia artificial para identificar y seleccionar a los mejores candidatos. El proyecto consta de:

- **Backend**: NestJS (Node.js) con PostgreSQL
- **Frontend**: Next.js 15 con TypeScript

## Pila Tecnológica

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4.x con tema personalizado
- **UI Library**: shadcn/ui + componentes custom de Intent UI
- **Auth**: Clerk (con control de acceso basado en roles)
- **Forms**: React Hook Form + Validación Zod
- **Tablas de datos**: @tanstack/react-table
- **Animaciones**: Framer Motion + react-tsparticles
- **PDF Rendering**: react-pdf-html, windy-pdf
- **Otros**: axios, lucide-react (iconos), date-fns, react-markdown

### Backend
- **Framework**: NestJS (Node.js)
- **Base de datos**: PostgreSQL
- **Antiguo Backend**: FastAPI (Python) - En proceso de migración

### Herramientas de Desarrollo
- ESLint 9.x
- PostCSS 8.x
- TypeScript 5.x

## Estructura del Proyecto

```
src/
├── app/                  # Páginas de Next.js App Router
│   ├── (main)/          # Rutas de la aplicación principal
│   │   ├── candidate/   # Sección de candidatos
│   │   ├── recruiter/   # Sección de reclutadores
│   │   └── companies/   # Landing de empresas
│   ├── api/             # Manejadores de rutas API
│   ├── types/           # Definiciones TypeScript
│   └── [root]/          # Páginas públicas (home, about, contact)
├── components/
│   ├── ui/              # Primitivas de shadcn/ui
│   └── [specific]/      # Componentes específicos por feature
├── lib/
│   ├── api/             # Clientes API (candidato, trabajo, cliente, etc.)
│   ├── roles.ts         # Definiciones de roles
│   └── utils.ts         # Funciones utilitarias
└── hooks/
    └── use-media-query  # Custom React hooks
```

## Características Principales

### Para Candidatos
- Onboarding de perfil (nombre, fecha de nacimiento, país, nivel educativo)
- Subida de CV y análisis AI
- Gestión de pagos (integración CUBO)
- Ver listado de trabajos

### Para Recrutadores
- Gestión de publicaciones de trabajo (crear, editar, borrar)
- Búsqueda y análisis de candidatos
- Ver perfiles de candidatos y resultados de análisis

### Páginas Públicas
- Home con sección hero
- Sobre la empresa
- Formulario de contacto
- Landing de empresas

## Autenticación y Autorización

**Proveedor**: Clerk
- Usa sesiones JWT con metadata: `onboardingComplete`, `role`
- Roles: `'admin' | 'user' | 'recruiter'`

**Middleware** ([middleware.ts](src/middleware.ts)):
- Protege todas las rutas excepto las públicas
- Redirige a los usuarios incompletos a `/candidate/onboard`
- Restricciones de rutas basadas en roles (candidatos vs reclutadores)

## Integración con Backend

### NestJS (Nuevo Backend)
**URL**: `NEXT_PUBLIC_BACKEND_URL` = `http://localhost:3000`

NestJS es el nuevo backend que reemplaza FastAPI. **Todos los nuevos endpoints deben hacerse aquí.**

### Endpoints ya migrados a NestJS

| Endpoint | Archivo | Descripción |
|----------|---------|-------------|
| `GET /trabajos` | TrabajosController | Listar trabajos por usuario |
| `GET /trabajos/:id` | TrabajosController | Obtener trabajo por ID |
| `POST /trabajos` | TrabajosController | Crear trabajo |
| `PUT /trabajos/:id` | TrabajosController | Actualizar trabajo |
| `DELETE /trabajos/:id` | TrabajosController | Eliminar trabajo |
| `GET /clientes` / `GET /clients` | ClientesController | Listar clientes |
| `POST /perfiles` | PerfilesController | Crear perfil |
| `GET /niveles` / `GET /nivel` | NivelesController | Listar niveles |
| `POST /candidatos/analisis` | CandidatosController | Analizar CV |
| `GET /candidatos/:id/saldo` | CandidatosController | Saldo del candidato |
| `POST /pagos` | PagosController | Crear pago CUBO |

### Endpoints que aún usan FastAPI (pendientes de migración)

| Endpoint | Archivo | Método | Descripción |
|----------|---------|--------|-------------|
| `/analyze/` | `AnalyzeForm.tsx` (recruiter) | POST | Analizar CV |
| `/feedbackCandidate/` | `AnalyzeForm.tsx` (candidate) | POST | Feedback candidato |
| `/pagos` | `payment/page.tsx` | POST | Crear pago CUBO |
| `/contactanos/` | `api.ts` | POST | Contacto (formulario) |

### Clientes API (FastAPI - en proceso de migración)
- `candidato.ts` - Perfil del candidato/saldo
- `trabajo.ts` - CRUD de trabajos
- `cliente.ts` - Gestión de clientes
- `perfil.ts` - Gestión de perfiles

## Estilo de Estilos

- Tema oscuro por defecto (gray-800/900)
- Gradientes y animaciones personalizadas
- Tailwind CSS 4.x con configuración custom

## Convenciones del Código

### Nombres de Archivos
- Usa `camelCase` para archivos JavaScript/TypeScript
- Usa `PascalCase` para componentes React
- Usa `snake_case` para rutas de URLs

### Comentarios
- **Todos los comentarios deben estar en español**

### Estructura de Componentes
1. Imports
2. Interfaces/Types
3. Props interface
4. Component function
5. Export

### Estilos
- Usa `className` con Tailwind CSS
- Prefiere `clsx()` o `cn()` para clases condicionales
- Usa `tailwind-variants` para componentes reutilizables
