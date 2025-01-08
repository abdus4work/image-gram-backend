import {z} from 'zod';

export const zodCommentSchema = z.object({
  content:z.string().min(1).max(500).trim(),
  onModel:z.enum(['Post', 'Comment']),
  commentableId:z.string()
})