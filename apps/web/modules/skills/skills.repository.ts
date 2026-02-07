import { prisma } from "@/lib/db";
import { CreateSkillDto } from "./types/skills.dto";

export async function createSkill({
  name,
  desc,
  mainContent,
  userId,
  downloadUrl,
}: CreateSkillDto) {
  return prisma.skill.create({
    data: {
      name,
      userId,
      desc,
      mainContent,
      downloadUrl,
    },
  });
}

// 获取skills分类
export async function getSkillsCategories() {
  return prisma.skillCategory.findMany();
}
