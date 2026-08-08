# Despliegue en AWS

Guía completa y paso a paso para desplegar AWSPECTRUM en AWS:

- **Backend** (NestJS + Prisma + PostgreSQL) → **AWS App Runner** (imagen en ECR construida por GitHub Actions)
- **Base de datos** → **RDS PostgreSQL**
- **Correos** (SES) → **AWS SES**
- **Frontend** (React/Vite) → **GitHub Pages**

> No necesitas Docker en tu máquina: GitHub Actions construye la imagen automáticamente.

---

## Fase 0 · Prerrequisitos

1. Cuenta de AWS con acceso a IAM, RDS, SES, ECR y App Runner.
2. Repositorio de GitHub con el código en la rama `main`.
3. Región de trabajo: **`us-east-1`** (todo el flujo del CI usa esta región).

---

## Fase 1 · Usuario IAM para CI + Secrets de GitHub

Crea un usuario para que GitHub Actions pueda subir la imagen y desplegar.

1. AWS Console → **IAM** → **Users** → **Create user** → nombre `github-actions` (sin permisos iniciales).
2. Entra al usuario → **Permissions** → **Add permissions** → **Create inline policy** → pestaña **JSON**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:CreateRepository",
        "ecr:PutImage",
        "ecr:CompleteLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:InitiateLayerUpload",
        "ecr:BatchCheckLayerAvailability",
        "ecr:BatchGetImage",
        "ecr:GetDownloadUrlForLayer"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "apprunner:StartDeployment",
        "apprunner:DescribeService",
        "apprunner:ListServices"
      ],
      "Resource": "*"
    }
  ]
}
```

3. **Security credentials** → **Create access key** → *Application running outside AWS* → copia el **Access Key ID** y el **Secret Access Key**.
4. En GitHub: **Settings → Secrets and variables → Actions** crea:

| Secret | Valor |
|---|---|
| `AWS_ACCESS_KEY_ID` | Access Key ID del paso anterior |
| `AWS_SECRET_ACCESS_KEY` | Secret Access Key del paso anterior |
| `APP_RUNNER_ARN` | ARN del servicio App Runner (se llena en la Fase 5) |

---

## Fase 2 · Base de datos RDS PostgreSQL

1. AWS Console → **RDS** → **Create database**.
2. Configuración:
   - **Engine**: PostgreSQL 16.
   - **Template**: Free tier (o Production).
   - **DB instance identifier**: `awspectrum-db`
   - **Master username**: `postgres`
   - **Master password**: contraseña fuerte (guárdala).
   - **DB instance class**: `db.t3.micro`.
   - **Public accessibility**: Yes.
   - **Initial database name**: `awspectrum`
   - **Backup**: backups automáticos 7 días.
3. Cuando esté **Available**, copia el **endpoint**:
   `awspectrum-db.<xxxx>.rds.amazonaws.com`
4. En **Connectivity & security → VPC security groups**, añade una regla **inbound TCP 5432** desde `0.0.0.0/0` (temporal; restringe después, ver Fase 10).

La cadena de conexión será:

```
postgresql://postgres:TU_PASSWORD@awspectrum-db.XXXXX.us-east-1.rds.amazonaws.com:5432/awspectrum
```

> Las tablas se crean solas: el contenedor ejecuta `prisma migrate deploy` al arrancar.

---

## Fase 3 · AWS SES (correos)

1. AWS Console → **Simple Email Service** → **Create identity**:
   - **Dominio** (recomendado): verifica los DNS en tu registrador.
   - **Email** suelto (rápido para pruebas).
2. En **Account dashboard → Sending statistics** solicita **Request production access** (necesario para enviar a emails reales).
3. Anota el **email verificado** → será `SES_SOURCE_EMAIL`.
4. Añade al usuario `github-actions` otra **inline policy**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["ses:SendEmail", "ses:SendRawEmail"],
      "Resource": "*"
    }
  ]
}
```

---

## Fase 4 · Repositorio ECR

1. AWS Console → **Amazon ECR** → **Create repository**.
2. Nombre: **`awspectrum-backend`** (coincide con `ECR_REPOSITORY` del workflow).
3. **Visibility**: Private → Create.
4. Haz un primer **push a `main`**: el CI subirá la imagen (el paso de App Runner fallará, es normal: aún no existe el servicio; la imagen sí queda en ECR).
5. Copia el **URI del repositorio**:
   `123456789012.dkr.ecr.us-east-1.amazonaws.com/awspectrum-backend`

---

## Fase 5 · Servicio App Runner (backend)

1. AWS Console → **AWS App Runner** → **Create service**.
2. **Source**: *Container registry* → Amazon ECR → imagen `awspectrum-backend:latest`.
3. **Service name**: `awspectrum-backend-service`.
4. **Runtime port**: `4000`.
5. **Health check**: path **`/api/health`**, interval 10 s, healthy threshold 3.

   > Importante: NO usar `/` como health check. La imagen no incluye el frontend, así que `/` devolvería 404 y App Runner marcaría el servicio como no saludable.

6. **Security**: deja que App Runner cree el rol de acceso a ECR.
7. **Environment variables**:

| Variable | Valor |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `4000` |
| `DATABASE_URL` | cadena de la Fase 2 |
| `JWT_SECRET` | 48+ caracteres (`openssl rand -base64 48`) |
| `CORS_ORIGIN` | `https://<tu-usuario>.github.io` (origin de Pages, sin ruta) |
| `AWS_REGION` | `us-east-1` |
| `SES_SOURCE_EMAIL` | identidad verificada |
| `AWS_ACCESS_KEY_ID` | del usuario `github-actions` |
| `AWS_SECRET_ACCESS_KEY` | del usuario `github-actions` |
| `THROTTLE_TTL` | `60` |
| `THROTTLE_LIMIT` | `10` |

8. **Autoscaling**: 1 instancia mínima, 1 vCPU / 2 GB.
9. Create service → URL **`https://<id>.<region>.awsapprunner.com`**.
10. Verifica: `curl https://<id>.<region>.awsapprunner.com/api/health` → `{"status":"ok","database":"up",...}`.
11. Copia el **ARN** del servicio → secret `APP_RUNNER_ARN` en GitHub.

---

## Fase 6 · Frontend GitHub Pages + CORS

1. En GitHub: **Settings → Secrets and variables → Actions → Variables** crea:
   - `VITE_API_URL` = `https://<id>.<region>.awsapprunner.com/api`
2. El workflow `deploy-pages.yml` sube solo `frontend/dist` a Pages:
   `https://<tu-usuario>.github.io/awspectrum-website/`
3. **CORS**: el navegador envía el `Origin` `https://<tu-usuario>.github.io` (sin la ruta del repo). Por eso `CORS_ORIGIN` en App Runner debe ser exactamente ese origin.
4. Prueba el formulario de contacto desde el sitio.

---

## Fase 7 · Disparar el despliegue

Push a `main` ejecuta en GitHub Actions:

- **test**: lint backend, unit tests y e2e (contra PostgreSQL temporal).
- **build-and-deploy**: imagen → ECR → `apprunner start-deployment`.
- **Deploy GitHub Pages**: publica el frontend.

Espera a que el deployment en App Runner quede **Healthy**.

---

## Fase 8 · Crear el usuario admin (seed)

Desde la raíz del proyecto (o AWS CloudShell):

```bash
export DATABASE_URL="postgresql://postgres:TU_PASSWORD@awspectrum-db.XXXXX.us-east-1.rds.amazonaws.com:5432/awspectrum"
export ADMIN_SEED_EMAIL="admin@tudominio.com"
export ADMIN_SEED_PASSWORD="UnaContrasenaMuyFuerte123!"
npm run prisma:seed
```

Salida esperada: `Admin user admin@tudominio.com created successfully.`

---

## Fase 9 · Verificación completa

```bash
# Salud
curl https://<id>.<region>.awsapprunner.com/api/health

# Login admin (devuelve accessToken)
curl -X POST https://<id>.<region>.awsapprunner.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@tudominio.com","password":"..."}'

# Endpoints públicos
curl https://<id>.<region>.awsapprunner.com/api/events
curl -X POST https://<id>.<region>.awsapprunner.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"type":"general","name":"Test","email":"a@b.com"}'

# Endpoints admin (con el token; sin token → 401)
curl -H "Authorization: Bearer <token>" https://<id>.<region>.awsapprunner.com/api/users
```

---

## Fase 10 · Endurecer para producción

1. **RDS**: restringe el security group (solo IPs de salida de App Runner o VPC Connector + RDS privada).
2. **Rotar `JWT_SECRET`** y mover credenciales a **AWS Secrets Manager**.
3. **Dominio propio** con HTTPS (App Runner lo da automáticamente).
4. Costos aprox. (us-east-1): RDS t3.micro ~$13/mes · App Runner 0.25 vCPU ~$1/mes · SES $0.10/1000 emails · Pages $0.
5. No subir `.env` a GitHub (ya está ignorado).

---

## Troubleshooting

| Síntoma | Causa probable | Solución |
|---|---|---|
| App Runner marca `Unhealthy` | Health check en `/` | Usar `/api/health` |
| `401` en `/api/users` con token | Token sin `role` (token viejo) | Volver a hacer login |
| Formulario de contacto falla | `CORS_ORIGIN` no coincide | Origin exacto de Pages sin ruta |
| Emails no llegan | SES en sandbox o identidad no verificada | Solicitar production access + verificar identidad |
| Servicio no arranca | Faltan variables de entorno | Revisar env vars y `DATABASE_URL` |
