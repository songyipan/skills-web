import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().nonempty("Name is required."),
  desc: z
    .string()
    .min(0, "Description must be at least 20 characters.")
    .max(500, "Description must be at most 100 characters.")
    .optional(),
  downloadUrl: z.string().nonempty("Download URL is required."),
  apiKey: z.string().nonempty("API Key is required."),
  mainContent: z.string().nonempty("Main content is required."),
});

export type SkillsSchema = z.infer<typeof skillSchema>;
