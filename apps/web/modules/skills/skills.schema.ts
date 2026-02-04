import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().nonempty("Name is required."),
  desc: z
    .string()
    .min(0, "Description must be at least 20 characters.")
    .max(500, "Description must be at most 100 characters.")
    .optional(),
  githubUrl: z.string().nonempty("Github URL is required."),
});

export type SkillsSchema = z.infer<typeof skillSchema>;
