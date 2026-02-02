import { prisma } from "@/lib/db";
import { SkillsDto } from "./types/skills.dto";

export async function createSkill({
  name,
  userId,
  desc,
  githubUrl,
}: SkillsDto) {
  return prisma.skill.create({
    data: {
      name,
      userId,
      desc,
      githubUrl,
    },
  });
}
