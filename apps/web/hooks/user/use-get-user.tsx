import { UserInfo } from "@/modules/user/types/user.dto";

import { getUserByGithubIdService } from "@/modules/user/user.service";
import { createQuery } from "react-query-kit";

export const useGetUser = createQuery<UserInfo, { githubId: string }, Error>({
  queryKey: ["user"],
  fetcher: async ({ githubId }) => {
    const res = await getUserByGithubIdService(githubId);
    if (!res) {
      throw new Error("User not found");
    }
    return res;
  },
});
