import { prisma } from "@/lib/db";

import { CreateApiKeyDto, UpdateApiKeyDto } from "./types/apiKey.dto";

export const createApiKey = async ({
  userId,
  expiresAt,
  apiKey,
}: CreateApiKeyDto) => {
  prisma.apiKey.create({
    data: {
      userId,
      apiKey: apiKey,
      expiresAt,
    },
  });
};
// 查询用户是否存在apiKey
export const findApiKeyByUserId = async (userId: string) => {
  return prisma.apiKey.findFirst({
    where: {
      userId,
    },
  });
};

// 更新apiKey
export const updateApiKey = async ({
  id,
  expiresAt,
  apiKey,
}: UpdateApiKeyDto) => {
  prisma.apiKey.update({
    where: {
      id,
    },
    data: {
      expiresAt,
      apiKey,
    },
  });
};
