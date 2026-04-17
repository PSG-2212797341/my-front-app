import http from "./index";
import type { CreateTotalItem, CreateTotalItemReturn } from "./types/index.api.type";

export const createTotalItem = async (params: CreateTotalItem): Promise<CreateTotalItemReturn> => {
  return await http.post("/total", params);
};
