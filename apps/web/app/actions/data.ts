"use server";

import { prisma } from "@/lib/db";

export async function getOrCreateUser(
  email: string,
  name?: string,
  image?: string,
) {
  return prisma.user.upsert({
    where: { email },
    update: { name, image },
    create: { email, name, image },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      skills: true,
      favorites: {
        include: { skill: true },
      },
    },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      skills: true,
      favorites: {
        include: { skill: true },
      },
    },
  });
}
