/**
 * @description createTotalItem()的参数类型
 */
export type CreateTotalItem = {
  name: string;
  total: number;
  describeName: string;
  dailyAve: number;
  dayOnDay: number;
  weakOnWeak: number;
};

/**
 * @description createTotalItem()的返回值类型
 */
export type CreateTotalItemReturn = {
  success: boolean;
  message: string;
  data: CreateTotalItem;
};
