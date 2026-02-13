import { useState } from "react";

import { UserInfo } from "@/modules/user/types/user.dto";

import { getUserByGithubIdService } from "@/modules/user/user.service";

export const useGetUser = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const getUserInfo = async (githubId: string) => {
    try {
      const res = await getUserByGithubIdService(githubId);
      if (!res) {
        return;
      }
      setUserInfo(res);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    userInfo,
    getUserInfo,
  };
};
