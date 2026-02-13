"use server";

import { deleteUploadedFile } from "@/services/uploads";
import { findUserByApiKeyService } from "../apiKey/apiKey.service";
import * as skillsRepository from "./skills.repository";
import { SkillsDto } from "./types/skills.dto";

// 根据apikey 查询用户
export const findUserByApiKey = async (apiKey: string) => {
  try {
    const resUser = await findUserByApiKeyService(apiKey);
    console.log(resUser, "-------resUser------");
    if (!resUser?.user) {
      throw new Error("ApiKey Error");
    }
    return resUser.user;
  } catch (error) {
    console.log("=== 根据 apiKey 查询用户失败 ===", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

// 创建技能
export const createSkill = async ({
  name,
  desc,
  mainContent,
  downloadUrl,
  apiKey,
}: SkillsDto) => {
  try {
    const resUser = await findUserByApiKeyService(apiKey);
    if (!resUser?.user) {
      throw new Error("ApiKey Error");
    }

    const resSkill = await checkSkillIsExistInUser({ name, apiKey });

    if (!resSkill) {
      return await skillsRepository.createSkill({
        name,
        userId: resUser.user.id,
        desc,
        mainContent,
        downloadUrl,
      });
    }

    // 如果用户有此技能 则删除旧的文件
    await deleteUploadedFile(resSkill.downloadUrl);
    // 更新技能
    return await skillsRepository.updateSkillByName({
      name,
      desc,
      mainContent,
      downloadUrl,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

/***
 * 检查用户是否有此技能
 * 先根据apikey判断用户是否存在
 * 如果用户存在根据user.id查询此用户是否有次skills
 * 如果有则更新
 */
export const checkSkillIsExistInUser = async ({
  name,
  apiKey,
}: Pick<SkillsDto, "name" | "apiKey">) => {
  try {
    const resUser = await findUserByApiKeyService(apiKey);
    if (!resUser?.user) {
      throw new Error("ApiKey Error");
    }

    // 2. 检查用户是否有此技能
    const resSkill = await skillsRepository.getSkillByNameAndUserId({
      name,
      userId: resUser.user.id,
    });

    if (!resSkill) {
      return false;
    }

    return resSkill;
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

// 获取技能分类
export const getSkillsCategoriesService = async () => {
  try {
    const skills = await skillsRepository.getSkillsCategories();
    return skills;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// 获取所有技能（分页）
export const getAllSkillsService = async ({
  page,
  pageSize,
  search,
  userId,
}: {
  page?: number;
  pageSize?: number;
  search?: string;
  userId?: string;
}) => {
  try {
    const result = await skillsRepository.getAllSkills({
      page,
      pageSize,
      search,
      userId,
    });
    return result;
  } catch (error) {
    console.log(error);
    return {
      data: [],
      total: 0,
      page: page || 1,
      pageSize: pageSize || 10,
      totalPages: 0,
    };
  }
};

// 根据skill id查询技能
export const getSkillByIdService = async ({ id }: { id: string }) => {
  try {
    if (!id) {
      throw new Error("Skill id is required");
    }
    const skill = await skillsRepository.getSkillById({ id });
    return skill;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// 根据userId查询技能
export const getSkillsByUserIdService = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    if (!userId) {
      throw new Error("User id is required");
    }
    const skills = await skillsRepository.getSkillsByUserId({ userId });
    return skills;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// 根据技能名称查询技能
export const getSkillsByNameService = async ({ name }: { name: string }) => {
  try {
    if (!name) {
      throw new Error("Skill name is required");
    }
    const skills = await skillsRepository.getSkillsByName({ name });
    return skills;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// 根据技能id增加下载量
export const incrementSkillDownloadCountService = async ({
  id,
}: {
  id: string;
}) => {
  try {
    if (!id) {
      throw new Error("Skill id is required");
    }
    const skill = await skillsRepository.incrementSkillDownloadCount({ id });
    return skill;
  } catch (error) {
    console.log(error);
    return null;
  }
};
