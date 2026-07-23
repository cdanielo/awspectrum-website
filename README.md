# Awspectrum Backend

Backend completamente integrado para Awspectrum usando NestJS, TypeScript y Prisma.

## Objetivo

Construir un backend escalable, seguro y modular con principios de Clean Architecture.

## Estructura del proyecto

awspectrum-website/
├── prisma/
│   └── schema.prisma
├── public/
│   ├── index.html
│   └── media/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── common/
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/
│   │   │   └── roles.guard.ts
│   │   └── pipes/
│   ├── config/
│   │   ├── app.config.ts
│   │   └── env.validation.ts
│   ├── modules/
│   │   └── user/
│   │       ├── dto/
│   │       │   └── create-user.dto.ts
│   │       ├── entities/
│   │       │   └── user.entity.ts
│   │       ├── user.controller.ts
│   │       ├── user.interface.ts
│   │       ├── user.module.ts
│   │       ├── user.repository.ts
│   │       └── user.service.ts
│   └── shared/
│       └── prisma/
│           ├── prisma.module.ts
│           └── prisma.service.ts
├── .env.example
├── .gitignore
├── ARCHITECTURE.md
├── nest-cli.json
├── package.json
├── tsconfig.build.json
└── tsconfig.json

## Instalación y arranque

1. Copia `.env.example` a `.env`.
2. Ajusta los valores de `DATABASE_URL`, `JWT_SECRET` y `CORS_ORIGIN`.
3. Instala dependencias:
   ```bash
   npm install
   ```
4. Genera Prisma Client:
   ```bash
   npm run prisma:generate
   ```
5. Ejecuta en modo desarrollo:
   ```bash
   npm run start:dev
   ```

## Conceptos clave

- **Modularidad**: cada dominio vive en `src/modules/<feature>`.
- **Separación de responsabilidades**: rutas, controladores, servicios, repositorios y entidades están separados.
- **Validación de entorno**: `zod` valida `.env` en tiempo de arranque.
- **Seguridad**: `helmet`, CORS, `ValidationPipe` y filtro global de excepciones.
- **Extensibilidad**: nuevos módulos se agregan sin alterar los ya existentes.

## Endpoint de ejemplo

- Ruta: `POST /api/users`
- Controlador: `src/modules/user/user.controller.ts`
- Servicio: `src/modules/user/user.service.ts`
- Repositorio: `src/modules/user/user.repository.ts`
- DTO: `src/modules/user/dto/create-user.dto.ts`

## Integración con frontend

La aplicación está preparada para servir contenido estático desde `public/`, lo que permite un despliegue integrado con el frontend y los recursos estáticos.

## Buenas prácticas para desarrollo futuro

- Añadir un módulo de `auth` con JWT y hash de contraseñas usando `bcrypt`.
- Mantener la lógica de negocio en servicios y repositorios.
- Registrar nuevos módulos en `src/app.module.ts`.
- Agregar tests unitarios y de integración para cada módulo.
