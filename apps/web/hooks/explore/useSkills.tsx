import { useState, useCallback } from "react";

import {
  getSkillByIdService,
  searchSkillsService,
} from "@/modules/skills/skills.service";
import { SkillDetailResponse } from "@/modules/skills/types/skills.dto";

export const useSkillDetail = () => {
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState<SkillDetailResponse | null>(null);

  const getSkillById = useCallback(async ({ id }: { id: string }) => {
    setLoading(true);
    const res = await getSkillByIdService({ id });
    console.log("=== 根据 skill id 查询技能 ===", res);
    setSkill(res);
    setLoading(false);
    return res;
  }, []);

  // 模糊搜索技能
  const searchSkills = useCallback(async ({ query }: { query: string }) => {
    setLoading(true);
    const res = await searchSkillsService({ query });
    console.log("=== 模糊搜索技能 ===", res);

    setLoading(false);
    return res;
  }, []);

  return {
    loading,
    skill,
    setSkill,
    getSkillById,
    searchSkills,
  };
};
