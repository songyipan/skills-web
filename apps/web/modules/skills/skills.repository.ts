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

// 更新技能
export async function updateSkillById({
  id,
  name,
  desc,
  mainContent,
  downloadUrl,
}: {
  id: string;
  name?: string;
  desc?: string;
  mainContent?: string;
  downloadUrl?: string;
}) {
  return prisma.skill.update({
    where: {
      id,
    },
    data: {
      name,
      desc,
      mainContent,
      downloadUrl,
    },
  });
}

// 根据name更新skills
export async function updateSkillByName({
  name,
  desc,
  mainContent,
  downloadUrl,
}: {
  name: string;
  desc?: string;
  mainContent?: string;
  downloadUrl?: string;
}) {
  return prisma.skill.update({
    where: {
      name,
    },
    data: {
      desc,
      mainContent,
      downloadUrl,
    },
  });
}

// 获取所有技能
export async function getAllSkills() {
  return prisma.skill.findMany();
}

// 模糊查询技能
export async function searchSkills({ query }: { query: string }) {
  return prisma.skill.findMany({
    where: {
      name: {
        contains: query,
      },
      desc: {
        contains: query,
      },
    },
  });
}

// 根据skill name和userId查询技能
export async function getSkillByNameAndUserId({
  name,
  userId,
}: {
  name: string;
  userId: string;
}) {
  return prisma.skill.findUnique({
    where: {
      name,
      userId,
    },
  });
}

// 根据skill name查询技能
export async function getSkillByName({ name }: { name: string }) {
  return prisma.skill.findUnique({
    where: {
      name,
    },
  });
}
