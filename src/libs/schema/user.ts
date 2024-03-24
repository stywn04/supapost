import { z } from "zod";
export const updateUserSchema = z.object({
  name: z.string().min(3, "Name too short, min 3 chars!"),
  username: z.string().min(2, "Username too short, min 2 chars!"),
  bio: z.string().min(1).max(150),
});

export type UpdateUserType = z.infer<typeof updateUserSchema>;
