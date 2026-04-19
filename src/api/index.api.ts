import http from "./index";
import type {
  CreateTotalItem,
  CreateTotalItemReturn,
  DeleteAllTotalReturn,
  GetAllTotalReturn,
} from "./types/index.api.type";

/**
 * @description 创建一个汇总项目数据
 */
export const createTotalItem = async (params: CreateTotalItem): Promise<CreateTotalItemReturn> => {
  return await http.post("/total", params);
};

/**
 * @description 清除所有的汇总项目的数据
 */
export const deleteAllTotal = async (): Promise<DeleteAllTotalReturn> => {
  return await http.delete("/total");
};

/**
 * @description 获取所有的汇总项目的数据
 */
export const getAllTotal = async (): Promise<GetAllTotalReturn> => {
  return await http.get("/total");
};
