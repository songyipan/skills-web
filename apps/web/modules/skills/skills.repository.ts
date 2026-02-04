import { prisma } from "@/lib/db";
import { SkillsDto } from "./types/skills.dto";
import { skillSchema } from "./skills.schema";

export async function createSkill({
  name,
  userId,
  desc,
  githubUrl,
}: SkillsDto) {
  // 1. 先用 Zod 做校验（只校验 schema 中关心的字段）
  const result = skillSchema.safeParse({ name, desc, githubUrl });
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return prisma.skill.create({
    data: {
      name,
      userId,
      desc,
      githubUrl,
    },
  });
}

// 获取skills分类
export async function getSkillsCategories() {
  return prisma.skillCategory.findMany();
}
