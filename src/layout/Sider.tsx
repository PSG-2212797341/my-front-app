import { useState } from "react";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { navigateByKey } from "./utils/navigationLogic";
import { generateMenuItems } from "./menuConfig";

const { Sider } = Layout;

function MySider() {
  const [selectedKeys, setSelectedKeys] = useState(["1-1"]);
  const [openKeys, setOpenKeys] = useState(["1"]);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 处理菜单选中事件
  const handleSelect = ({ key }: { key: string }) => {
    // 检查是否是父菜单（不包含"-"的key）
    const isParentMenu = !key.includes("-");

    let targetKey = key;

    // 如果是父菜单，选择其第一个子菜单
    if (isParentMenu) {
      targetKey = `${key}-1`;
    }

    // 提取父菜单key（例如从"1-1"提取"1"）
    const parentKey = targetKey.split("-")[0];

    // 设置选中的key，包括子菜单和父菜单
    const newSelectedKeys = [targetKey];

    // 如果选中的是子菜单，也选中对应的父菜单
    if (targetKey.includes("-") && !selectedKeys.includes(parentKey)) {
      newSelectedKeys.push(parentKey);
    }

    setSelectedKeys(newSelectedKeys);

    // 根据菜单key导航到对应的路由
    navigateByKey(navigate, targetKey);
  };

  // 处理菜单展开/收起事件 - 只允许打开一个菜单
  const handleOpenChange = (keys: string[]) => {
    // 只保留最新打开的菜单key
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);

    if (latestOpenKey) {
      // 打开新菜单时，选中该菜单的第一个子项
      // 例如：打开菜单"1"时，选中"1-1"
      const firstChildKey = `${latestOpenKey}-1`;
      setSelectedKeys([firstChildKey, latestOpenKey]);

      // 只打开这个新菜单
      setOpenKeys([latestOpenKey]);

      // 导航到第一个子路由
      navigateByKey(navigate, firstChildKey);
    } else {
      // 如果没有新打开的菜单（可能是关闭操作），清空openKeys
      setOpenKeys([]);
    }
  };

  // 生成菜单项
  const menuItems = generateMenuItems(selectedKeys);

  return (
    <Sider
      style={{
        background: colorBgContainer,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%", // 改为100%继承父容器高度
        overflowY: "hidden",
        boxSizing: "content-box",
      }}
    >
      <div
        className="h-16 leading-16 border-b-gray-200 border-r-gray-200 border-b border-r box-content text-center"
        style={{ flexShrink: 0 }}
      >
        用于存放LOGO
      </div>
      <div style={{ flex: 1, overflow: "auto" }}>
        <Menu
          theme="light"
          mode="inline"
          style={{ padding: "20px" }}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onSelect={handleSelect}
          onOpenChange={handleOpenChange}
          items={menuItems}
        />
      </div>
    </Sider>
  );
}

export default MySider;
