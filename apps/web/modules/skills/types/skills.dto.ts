export interface SkillsDto {
  name: string;
  mainContent?: string;
  downloadUrl: string;
  desc?: string;
  apiKey: string;
}

export interface CreateSkillDto extends Omit<SkillsDto, "apiKey"> {
  userId: string;
}

// 分页查询参数
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

// skills详情（匹配 Prisma Skill & { user: User } 类型）
export type SkillDetailResponse = {
  id: string;
  name: string;
  downloads: number;
  desc: string | null;
  mainContent: string | null;
  downloadUrl: string;
  userId: string;
  skillCategoryId: string | null;
  createdAt: Date;
  user: {
    id: string;
    email: string | null;
    username: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
} | null;
