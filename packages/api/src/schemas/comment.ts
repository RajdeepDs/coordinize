import { z } from "zod/v4";

export const createCommentSchema = z.object({
  content: z.string().min(1, "Comment content is required."),
  postId: z.string().min(1, "Post ID is required."),
  parentId: z.string().optional(),
});

export const updateCommentSchema = z.object({
  id: z.string().min(1, "Comment ID is required."),
  content: z.string().min(1, "Comment content is required."),
});

export const deleteCommentSchema = z.object({
  id: z.string().min(1, "Comment ID is required."),
});

export const getCommentsSchema = z.object({
  postId: z.string().min(1, "Post ID is required."),
});

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
export type UpdateCommentSchema = z.infer<typeof updateCommentSchema>;
export type DeleteCommentSchema = z.infer<typeof deleteCommentSchema>;
export type GetCommentsSchema = z.infer<typeof getCommentsSchema>;
