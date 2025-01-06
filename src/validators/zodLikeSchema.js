import {z} from 'zod';

export const zodLikeSchema = z.object({
  onModel: z.enum(['Post', 'Comment']),
  likeableId: z.string(),
});
