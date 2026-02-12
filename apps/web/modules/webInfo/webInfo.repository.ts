import { prisma } from "@/lib/db";
import { CreateWebInfoDto } from "./types/webInfo.dto";

export const createWebInfo = async (data: CreateWebInfoDto) => {
  // 实现数据库操作
};

// 获取网站信息
export const getWebInfo = async (name: string) => {
  // 实现数据库操作
  const webInfo = await prisma.websiteInfo.findUnique({
    where: {
      name,
    },
  });
  return webInfo;
};
