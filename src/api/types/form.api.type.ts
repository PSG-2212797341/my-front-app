import type { Pagination } from "./usually.type";

/**
 * @description createDynamicForm()的参数类型
 */
export type CreateForm = {
  /**
   * @description 动态表单的配置
   */
  formConfig: string;
  /**
   * @description 动态表单的值
   */
  formData: string;
  /**
   * @description 动态表单的名字
   */
  name: string;
  /**
   * @description 动态表单的创建时间
   */
  createdAt?: Date;
  /**
   * @description 动态表单的更新时间
   */
  updatedAt?: Date;
};

/**
 * @description getAllDynamicForms()的返回值类型
 */
export type GetAllFormReturn = {
  success: boolean;
  data: CreateForm[];
  pagination: Pagination;
  timestamp: string;
};
