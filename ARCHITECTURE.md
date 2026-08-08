# Arquitectura del Backend Awspectrum

## Visión general

Este backend está diseñado como una aplicación NestJS modular con separación clara entre:
- Rutas / endpoints
- Controladores
- Servicios de dominio
- Repositorios de acceso a datos
- Configuración global y seguridad
- Capas compartidas e infraestructuras

## Principios aplicados

- Clean Architecture / Arquitectura en Capas
- Principio de Responsabilidad Única
- Principio Open/Closed
- Inversión de dependencias con inyección de dependencias de NestJS
- Validación de entrada con `class-validator` (ValidationPipe global con whitelist) y `zod` para variables de entorno
- Seguridad con `helmet`, CORS, rate limiting (`@nestjs/throttler`) y manejo centralizado de errores

## Estructura de carpetas

- `src/config`: configuración y validación de variables de entorno
- `src/shared`: recursos compartidos de infraestructura (Prisma, configuración global)
- `src/modules`: módulos de dominio con sus controladores, servicios y repositorios
- `src/common`: componentes transversales como filtros, pipes y guardias

## Flujo básico de una petición

1. El cliente consume un endpoint HTTP en `src/modules/<feature>/<feature>.controller.ts`
2. El controlador recibe y valida datos de entrada
3. El controlador delega la lógica al servicio en `src/modules/<feature>/<feature>.service.ts`
4. El servicio utiliza repositorios para acceder a la base de datos en `src/modules/<feature>/<feature>.repository.ts`
5. El repositorio usa `PrismaService` para operar contra PostgreSQL

## Extensibilidad

Para añadir un nuevo módulo, siga esta plantilla:

1. `src/modules/<nuevo-modulo>/<nuevo-modulo>.module.ts`
2. `src/modules/<nuevo-modulo>/<nuevo-modulo>.controller.ts`
3. `src/modules/<nuevo-modulo>/<nuevo-modulo>.service.ts`
4. `src/modules/<nuevo-modulo>/<nuevo-modulo>.repository.ts`
5. `src/modules/<nuevo-modulo>/dto/*` y `src/modules/<nuevo-modulo>/entities/*`

Esto garantiza que el código nuevo no rompe los módulos existentes.

## Seguridad

- `helmet` habilita headers de seguridad esenciales
- CORS controlado por `CORS_ORIGIN`
- Validación de esquema de variables de entorno mediante `zod`
- `ValidationPipe` global y `HttpExceptionFilter` para respuestas seguras

## Integración con frontend

El frontend (React + Vite) se construye en `frontend/dist` y se despliega de forma independiente a GitHub Pages
(`.github/workflows/deploy-pages.yml`). El backend NestJS se despliega en AWS App Runner y sirve únicamente la API
bajo `/api`. Cuando `frontend/dist` existe en el mismo proceso, el backend también sirve la SPA de forma integrada.

El frontend llama a la API mediante `VITE_API_URL` (variable de entorno de build); si no está definida usa la ruta
relativa `/api` (útil en desarrollo con el proxy de Vite o en modo integrado).
