import { z } from 'zod';

export const CreateContactSchema = z.object({
  type: z.enum(['sponsor', 'speaker', 'community', 'general', 'newsletter']),
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Correo inválido'),
  interest: z.string().optional(),
  message: z.string().optional(),
});

export type CreateContactDto = z.infer<typeof CreateContactSchema>;
