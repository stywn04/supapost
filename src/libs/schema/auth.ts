import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 chars!"),
  username: z.string().min(2, "Username must be at least 2 chars!"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 chars!"),
});

export type RegisterType = z.infer<typeof registerSchema>;
