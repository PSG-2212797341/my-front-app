/**
 * @description 通用请求结果类型
 */
export interface UsuallyReturn<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}
