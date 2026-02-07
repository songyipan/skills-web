import { prisma } from "@/lib/db";

import { CreateApiKeyDto, UpdateApiKeyDto } from "./types/apiKey.dto";

export const createApiKey = async ({
  userId,
  expiresAt,
  apiKey,
}: CreateApiKeyDto) => {
  return prisma.userApiKey.create({
    data: {
      userId,
      apiKey: apiKey,
      expiresAt,
    },
  });
};
// 查询用户是否存在apiKey
export const findApiKeyByUserId = async (userId: string) => {
  return prisma.userApiKey.findFirst({
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
  return prisma.userApiKey.update({
    where: {
      id,
    },
    data: {
      expiresAt,
      apiKey,
    },
  });
};

// 根据apiKey查询用户
export const findUserByApiKey = async (apiKey: string) => {
  return prisma.userApiKey.findFirst({
    where: {
      apiKey,
    },
    include: {
      user: true,
    },
  });
};
