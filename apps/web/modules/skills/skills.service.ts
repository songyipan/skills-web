import * as skillsRepository from "./skills.repository";
import { SkillsDto } from "./types/skills.dto";

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

export const getSkillsCategoriesService = async () => {
  try {
    const skills = await skillsRepository.getSkillsCategories();
    return skills;
  } catch (error) {
    console.log(error);
    return [];
  }
};
