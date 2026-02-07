import { findUserByApiKeyService } from "../apiKey/apiKey.service";
import * as skillsRepository from "./skills.repository";
import { SkillsDto } from "./types/skills.dto";

export const createSkill = async ({
  name,
  desc,
  mainContent,
  downloadUrl,
  apiKey,
}: SkillsDto) => {
  try {
    const resUser = await findUserByApiKeyService(apiKey);

    console.log(resUser, "-------resUser------");

    if (!resUser) {
      throw new Error("ApiKey Error");
    }

    return await skillsRepository.createSkill({
      name,
      userId: resUser.user.id,
      desc,
      mainContent,
      downloadUrl,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
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
