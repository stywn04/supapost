import { z } from "zod";

export const postSchema = z.object({
  content: z.string().min(1, "Content cannot be empty!"),
});

export type postType = z.infer<typeof postSchema>
