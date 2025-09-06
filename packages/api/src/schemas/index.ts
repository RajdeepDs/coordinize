import { z } from 'zod/v4';

export const createSpaceSchema = z.object({
  name: z.string().min(3, 'Space name must be at least 3 characters.'),
  identifier: z.string().min(3, 'Identifier must be at least 3 characters.'),
  about: z.string(),
  icon: z.string().optional(),
});

export const togglefavoriteSchema = z.object({
  type: z.enum(['post', 'space']),
  id: z.string(),
});
