"use server";
import { createWebInfo, getWebInfo } from "./webInfo.repository";
import { CreateWebInfoDto } from "./types/webInfo.dto";
import { createWebInfoSchema } from "./webInfo.scheme";

export const createWebInfoService = async (data: CreateWebInfoDto) => {
  // 1. 先用 Zod 做校验
  const result = createWebInfoSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.message);
  }

  await createWebInfo(data);
};

export const getWebInfoService = async (name: string) => {
  return await getWebInfo(name);
};
