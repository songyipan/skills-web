// store/useUserStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInfo } from "@/modules/user/types/user.dto";

const useUserStore = create(
  persist(
    (set) => ({
      // 初始状态
      userInfo: {},

      // Action: 设置用户信息
      setUserInfo: (info: UserInfo) =>
        set((state: { userInfo: UserInfo }) => ({
          userInfo: { ...state.userInfo, ...info },
          isLoggedIn: true,
        })),

      // Action: 退出登录
      logout: () =>
        set({
          userInfo: {},
          isLoggedIn: false,
        }),
    }),
    {
      name: "user-storage", // 存储在 localStorage 中的 key
    },
  ),
);

export default useUserStore;
