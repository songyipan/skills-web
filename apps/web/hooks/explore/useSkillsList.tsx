import { useState, useCallback, useEffect } from "react";

import { PaginatedResult } from "@/modules/skills/types/skills.res";
import { getAllSkillsService } from "@/modules/skills/skills.service";
import { Skill } from "@repo/db";

export const useSkillsList = () => {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<PaginatedResult<Skill>>({
    data: [],
    total: 0,
    page: 1,
    pageSize: 30,
    totalPages: 0,
  });

  const getSkillsAll = useCallback(async () => {
    setLoading(true);
    const res = await getAllSkillsService({
      page: pages.page,
      pageSize: pages.pageSize,
    });
    console.log("=== 所有技能 ===", res);
    setPages(res);
    setLoading(false);
  }, [pages.page, pages.pageSize]);

  useEffect(() => {
    getSkillsAll();
  }, [getSkillsAll]);

  return {
    loading,
    pages,
    setPages,
    getSkillsAll,
  };
};
