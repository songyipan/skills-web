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
