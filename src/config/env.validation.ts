import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().positive().default(4000),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  CORS_ORIGIN: z.string().url(),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().default('us-east-1'),
  SES_SOURCE_EMAIL: z.string().email().default('noreply@awspectrum.com'),
  THROTTLE_TTL: z.coerce.number().positive().default(60),
  THROTTLE_LIMIT: z.coerce.number().positive().default(10),
  ADMIN_SEED_EMAIL: z.string().email().default('admin@awspectrum.com'),
  ADMIN_SEED_PASSWORD: z.string().min(8).default('admin123456'),
});

export type EnvConfig = z.infer<typeof envSchema>;
