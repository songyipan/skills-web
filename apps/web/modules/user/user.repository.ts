import { prisma } from "@/lib/db";
import { CreateUserDto } from "./types/user.dto";

export const createUser = async (data: CreateUserDto) => {
  // 如果用户已存在则返回现有用户，否则创建新用户
  // const existingUser = await prisma.user.findUnique({
  //   where: { use },
  // });

  // if (existingUser) {
  //   return existingUser;
  // }

  return prisma.user.create({
    data,
  });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const getUserByUsername = async (username: string) => {
  return prisma.user.findUnique({
    where: { username },
  });
};