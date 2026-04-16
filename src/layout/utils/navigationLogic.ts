import type { NavigateFunction } from "react-router-dom";

// 根据菜单key导航到对应的路由
export const navigateByKey = (navigate: NavigateFunction, key: string) => {
  switch (key) {
    case "1-1":
      navigate("/analytics");
      break;
    case "2-1":
      navigate("/form/basic");
      break;
    case "3-1":
      navigate("/list/standard");
      break;
    case "4-1":
      navigate("/detail/basic");
      break;
    default:
      // 默认导航到首页（Dashboard）
      navigate("/");
      break;
  }
};
