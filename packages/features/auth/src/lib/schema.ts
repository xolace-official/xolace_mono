import { z } from 'zod';

export const EmailSchema = z.object({
  email: z.string().email(),
});

export const EmailPasswordSchema = EmailSchema.extend({
  password: z.string().min(8),
});
