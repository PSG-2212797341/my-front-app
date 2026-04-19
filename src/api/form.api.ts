import http from "./index";
import type { CreateForm, GetAllFormReturn } from "./types/form.api.type";
import type { UsuallyReturn } from "./types/usually.type";

/**
 * @description 保存一个动态表单
 */
export const createDynamicForm = (params: CreateForm): Promise<UsuallyReturn<null>> => {
  return http.post("dynamic-forms", params);
};

/**
 * @description 获取所有的动态表单
 */
export const getAllDynamicForms = (): Promise<GetAllFormReturn> => {
  return http.get("dynamic-forms");
};
