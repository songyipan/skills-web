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

// 获取所有技能（分页 + 模糊搜索 + 用户过滤）
export async function getAllSkills({
  page = 1,
  pageSize = 30,
  search,
  userId,
}: {
  page?: number;
  pageSize?: number;
  search?: string;
  userId?: string;
} = {}) {
  const skip = (page - 1) * pageSize;

  const where = {
    ...(userId && { userId }),
    ...(search && {
      OR: [{ name: { contains: search } }, { desc: { contains: search } }],
    }),
  };

  const [data, total] = await Promise.all([
    prisma.skill.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.skill.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
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

// 根据skill id查询技能
export async function getSkillById({ id }: { id: string }) {
  return prisma.skill.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
}

// 根据userId查询技能
export async function getSkillsByUserId({ userId }: { userId: string }) {
  return prisma.skill.findMany({
    where: {
      userId,
    },
  });
}

// 根据skills 的name 查询技能
export async function getSkillsByName({ name }: { name: string }) {
  return prisma.skill.findMany({
    where: {
      name,
    },
  });
}

// 根据skills的id将下载量增加1
export async function incrementSkillDownloadCount({ id }: { id: string }) {
  return prisma.skill.update({
    where: {
      id,
    },
    data: {
      downloads: {
        increment: 1,
      },
    },
  });
}
