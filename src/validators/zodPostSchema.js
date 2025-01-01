import {z} from 'zod';

export const zodPostSchema = z.object({
  caption: z.string().min(3).trim(),
  image: z.string().url(),
})