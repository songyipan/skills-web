export type CreateApiKeyDto = {
  expiresAt: Date;
  apiKey: string;
  userId: string;
};

// 更新apiKey
export type UpdateApiKeyDto = {
  id: string;
  expiresAt: Date;
  apiKey: string;
};
