import { PrismaClient } from "./generated/client";

declare const process: {
  env: {
    NODE_ENV?: string;
  };
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // @ts-ignore - Prisma 7.x requires accelerateUrl or adapter
  } as any);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export type { PrismaClient } from "./generated/client";
export type {
  User,
  Skill,
  SkillCategory,
  FavoriteSkill,
} from "./generated/client";
