import { z } from "zod";

export const createUserSchema = z.object({
  // 添加你的校验规则
  username: z.string().min(1, "Username is required"),
  email: z.union([z.string().email("Email is invalid"), z.literal("")]).optional(),
  image: z.union([z.string().url("Image URL is invalid"), z.literal("")]).optional(),
});
