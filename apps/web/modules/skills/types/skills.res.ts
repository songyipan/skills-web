// 分页查询结果
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  search?: string;
  pageSize: number;
  totalPages: number;
}
