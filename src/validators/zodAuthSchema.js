import { z } from 'zod';

export const zodSignUpSchema = z.object({
  fullName: z.string().trim().optional(),
  avatar: z.string().optional(),
  role: z.enum(['user', 'admin']).default('user'),
  email: z.string().email().min(6).trim(),
  username: z.string().min(3).trim(),
  password: z.string().min(6)
});

export const zodSignInSchema = z.object({
  identifier: z.string().min(3).trim(),
  password: z.string().min(6)
});
