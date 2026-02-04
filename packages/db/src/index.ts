import { PrismaClient } from "./generated/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export type { PrismaClient } from "./generated/client";
export type {
  User,
  Skill,
  SkillCategory,
  FavoriteSkill,
} from "./generated/client";
