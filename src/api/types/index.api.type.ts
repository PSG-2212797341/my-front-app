import type { UsuallyReturn } from "./usually.type";

/**
 * @description createTotalItem()的参数类型
 */
export type CreateTotalItem = {
  name: string;
  total: number;
  dailyAve: number;
  dayOnDay: number;
  weakOnWeak: number;
};

/**
 * @description createTotalItem()的返回值类型
 */
export type CreateTotalItemReturn = UsuallyReturn<CreateTotalItem>;

/**
 * @description deleteAllTotal()的返回类型
 */
export type DeleteAllTotalReturn = UsuallyReturn<{
  deletedCount: number;
}>;

/**
 * @description getAllTotal()的返回类型
 */
export type GetAllTotalReturn = {
  success: boolean;
  data: CreateTotalItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  timestamp: Date | string;
};
