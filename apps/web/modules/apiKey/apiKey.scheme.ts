import { z } from "zod";

export const createApiKeySchema = z.object({
  expiresAt: z.date(),
  apiKey: z.string().nonempty("API Key is required."),
  userId: z.string().nonempty("User ID is required."),
});
