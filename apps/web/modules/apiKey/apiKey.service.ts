import { createApiKey } from "./apiKey.repository";
import { CreateApiKeyDto } from "./types/apiKey.dto";
import { createApiKeySchema } from "./apiKey.scheme";

export const createApiKeyService = async ({ userId, expiresAt, apiKey }: CreateApiKeyDto) => {

  // 1. 先用 Zod 做校验（只校验 schema 中关心的字段）
  const result = createApiKeySchema.safeParse({ userId, expiresAt, apiKey });
  if (!result.success) {
    throw new Error(result.error.message);
  }

  await createApiKey({ userId, expiresAt, apiKey });
}