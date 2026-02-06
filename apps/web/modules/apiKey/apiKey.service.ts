"use server";
import { createApiKey, updateApiKey } from "./apiKey.repository";
import { CreateApiKeyDto, UpdateApiKeyDto } from "./types/apiKey.dto";
import { createApiKeySchema } from "./apiKey.scheme";

export const createApiKeyService = async ({
  userId,
  expiresAt,
  apiKey,
}: CreateApiKeyDto) => {
  // 1. 先用 Zod 做校验（只校验 schema 中关心的字段）
  const result = createApiKeySchema.safeParse({ userId, expiresAt, apiKey });
  if (!result.success) {
    throw new Error(result.error.message);
  }

  return createApiKey({ userId, expiresAt, apiKey });
};

// 更新apiKey
export const updateApiKeyService = async ({
  id,
  expiresAt,
  apiKey,
}: UpdateApiKeyDto) => {
  try {
    await updateApiKey({ id, expiresAt, apiKey });
  } catch (error) {
    throw new Error("Update apiKey failed");
  }
};
