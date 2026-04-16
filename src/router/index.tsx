import { Routes, Route } from "react-router-dom";
import Analytics from "@/pages/index/Analytics";
import BasicForm from "@/pages/form/BasicForm";
import StandardList from "@/pages/list/StandardList";
import BasicDetail from "@/pages/detail/BasicDetail";
import MyLayout from "@/layout/Index";

// 路由配置组件
const AppRoutes = () => {
  return (
    <Routes>
      {/* 使用布局作为根路由 */}
      <Route path="/" element={<MyLayout />}>
        {/* 首页相关路由 */}
        <Route path="analytics" element={<Analytics />} />

        {/* 表单状态相关路由 */}
        <Route path="form">
          <Route path="basic" element={<BasicForm />} />
        </Route>

        {/* 列表状态相关路由 */}
        <Route path="list">
          <Route path="standard" element={<StandardList />} />
        </Route>

        {/* 详情列表相关路由 */}
        <Route path="detail">
          <Route path="basic" element={<BasicDetail />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
