"use server";
import {
  createApiKey,
  findApiKeyByUserId,
  updateApiKey,
} from "./apiKey.repository";
import { CreateApiKeyDto, UpdateApiKeyDto } from "./types/apiKey.dto";
import { createApiKeySchema } from "./apiKey.scheme";

// 更新apiKey
export const updateApiKeyService = async ({
  id,
  expiresAt,
  apiKey,
}: UpdateApiKeyDto) => {
  try {
    return await updateApiKey({ id, expiresAt, apiKey });
  } catch (error) {
    throw new Error("Update apiKey failed");
  }
};

// 创建apiKey
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

  // 2. 检查用户是否已经有 API key
  const res = await findApiKeyByUserId(userId);

  if (res) {
    return await updateApiKey({ id: res.id, expiresAt, apiKey });
  }

  return createApiKey({ userId, expiresAt, apiKey });
};

// 获取apiKey
export const getApiKeyService = async ({ userId }: { userId: string }) => {
  try {
    return await findApiKeyByUserId(userId);
  } catch (error) {
    console.log("=== 获取 apiKey 失败 ===", error);
    throw new Error("Get apiKey failed");
  }
};
