import { useState, useCallback } from "react";

import { getSkillByIdService } from "@/modules/skills/skills.service";
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

  return {
    loading,
    skill,
    setSkill,
    getSkillById,
  };
};
