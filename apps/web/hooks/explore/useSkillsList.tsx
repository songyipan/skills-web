import { createQuery } from "react-query-kit";
import { PaginatedResult } from "@/modules/skills/types/skills.res";
import { getAllSkillsService } from "@/modules/skills/skills.service";
import { Skill } from "@repo/db";

export const useSkillsList = createQuery<
  PaginatedResult<Skill>,
  { page?: number; pageSize?: number; search?: string; userId?: string }
>({
  queryKey: ["skillsList"],
  fetcher: ({ page = 1, pageSize = 30, search, userId }) =>
    getAllSkillsService({ page, pageSize, search, userId }),
});
