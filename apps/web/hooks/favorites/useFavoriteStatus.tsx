import { createQuery } from "react-query-kit";
import { isFavorited } from "@/app/actions/skills";

export const useFavoriteStatus = createQuery<
  boolean,
  { userId: string; skillId: string },
  Error
>({
  queryKey: ["favorite-status"],
  fetcher: async ({ userId, skillId }) => {
    return isFavorited(userId, skillId);
  },
});
