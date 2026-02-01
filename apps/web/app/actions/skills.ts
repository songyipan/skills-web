"use server";

import { prisma } from "@/lib/db";

export async function createSkill(userId: string, name: string, desc?: string) {
  return prisma.skill.create({
    data: {
      name,
      desc,
      userId,
      githubUrl: "",
    },
  });
}

export async function deleteSkill(userId: string, skillId: string) {
  return prisma.skill.delete({
    where: { id: skillId, userId },
  });
}

export async function getUserSkills(userId: string) {
  return prisma.skill.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function favoriteSkill(userId: string, skillId: string) {
  return prisma.favoriteSkill.create({
    data: { userId, skillId },
  });
}

export async function unfavoriteSkill(userId: string, skillId: string) {
  return prisma.favoriteSkill.delete({
    where: {
      userId_skillId: { userId, skillId },
    },
  });
}

export async function getFavoriteSkills(userId: string) {
  return prisma.favoriteSkill.findMany({
    where: { userId },
    include: { skill: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function isFavorited(userId: string, skillId: string) {
  const fav = await prisma.favoriteSkill.findUnique({
    where: { userId_skillId: { userId, skillId } },
  });
  return !!fav;
}
