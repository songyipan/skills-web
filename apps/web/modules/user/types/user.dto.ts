export type CreateUserDto = {
  // 添加你的字段
  username: string;
  email?: string;
  image?: string;
  githubId: string;
};

export type UserInfo = {
  id: string;
  email: string | null;
  username: string;
  githubId: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};
