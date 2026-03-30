import { createQuery } from "react-query-kit";
import { FavoriteSkill, Skill } from "@repo/db";
import { getFavoriteSkills } from "@/app/actions/skills";

export type FavoriteSkillWithSkill = FavoriteSkill & {
  skill: Skill;
};

export const useFavoriteSkills = createQuery<
  FavoriteSkillWithSkill[],
  { userId: string },
  Error
>({
  queryKey: ["favorite-skills"],
  fetcher: async ({ userId }) => {
    return getFavoriteSkills(userId);
  },
});
