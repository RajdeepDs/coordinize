import { z } from 'zod/v4';
import { EMPTY_HTML } from '@/utils/markdown';

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string(),
  space_id: z.string().min(1, 'Space is required.'),
});

export type PostSchema = z.infer<typeof postSchema>;

export const postDefaultValues: PostSchema = {
  title: '',
  description: EMPTY_HTML,
  space_id: '',
};
