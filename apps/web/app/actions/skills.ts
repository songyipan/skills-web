"use server";

import { prisma } from "@/lib/db";
import { createSkill as createSkillService } from "@/modules/skills/skills.service";
import { getSkillsCategoriesService } from "@/modules/skills/skills.service";

export async function createSkill({
  name,
  desc,
  userId,
  downloadUrl,
}: {
  name: string;
  desc?: string;
  userId: string;
  downloadUrl: string;
}) {
  return createSkillService({ name, desc, downloadUrl, apiKey: "" });
}

export async function getSkillsCategories() {
  return getSkillsCategoriesService();
}

export async function deleteSkill(userId: string, skillId: string) {
  // return prisma.skill.delete({
  //   where: { id: skillId, userId },
  // });
}

export async function getUserSkills(userId: string) {
  // return prisma.skill.findMany({
  //   where: { userId },
  //   orderBy: { createdAt: "desc" },
  // });
}

export async function favoriteSkill(userId: string, skillId: string) {
  if (!userId || !skillId) {
    throw new Error("User id and skill id are required");
  }

  return prisma.favoriteSkill.upsert({
    where: {
      userId_skillId: { userId, skillId },
    },
    update: {},
    create: { userId, skillId },
  });
}

export async function unfavoriteSkill(userId: string, skillId: string) {
  if (!userId || !skillId) {
    throw new Error("User id and skill id are required");
  }

  return prisma.favoriteSkill.deleteMany({
    where: {
      userId,
      skillId,
    },
  });
}

export async function getFavoriteSkills(userId: string) {
  if (!userId) {
    return [];
  }

  return prisma.favoriteSkill.findMany({
    where: { userId },
    include: { skill: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function isFavorited(userId: string, skillId: string) {
  if (!userId || !skillId) {
    return false;
  }

  const fav = await prisma.favoriteSkill.findUnique({
    where: { userId_skillId: { userId, skillId } },
  });

  return !!fav;
}
