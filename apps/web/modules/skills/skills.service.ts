import * as skillsRepository from "./skills.repository";
import { SkillsDto } from "./types/skills.dto";
import { skillSchema } from "./skills.schema";

export const createSkill = async ({
  name,
  userId,
  desc,
  githubUrl,
}: SkillsDto) => {
  try {
    await skillsRepository.createSkill({
      name,
      userId,
      desc,
      githubUrl,
    });
  } catch (error) {
    console.log(error);
  }
};
