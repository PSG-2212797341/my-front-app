import React from "react";
import { AppstoreOutlined, FolderOutlined, MenuOutlined, ReadOutlined } from "@ant-design/icons";
import defaultRound from "@/assets/svg/defaultRound.svg";
import activeRound from "@/assets/svg/activeRound.svg";

// 根据选中状态获取图标
export const getIcon = (selectedKeys: string[], key: string): React.ReactElement => {
  const isSelected = selectedKeys.includes(key);
  const svgSrc = isSelected ? activeRound : defaultRound;
  return <img src={svgSrc} alt="round" style={{ width: 6, height: 6 }} />;
};

// 生成菜单项
export const generateMenuItems = (selectedKeys: string[]) => [
  {
    key: "1",
    icon: <AppstoreOutlined />,
    label: "首页",
    children: [
      {
        key: "1-1",
        label: "数据分析",
        icon: getIcon(selectedKeys, "1-1"),
      },
    ],
  },
  {
    key: "2",
    icon: <FolderOutlined />,
    label: "表单状态",
    children: [
      {
        key: "2-1",
        label: "基础表单",
        icon: getIcon(selectedKeys, "2-1"),
      },
    ],
  },
  {
    key: "3",
    icon: <MenuOutlined />,
    label: "列表状态",
    children: [
      {
        key: "3-1",
        label: "查询表格",
        icon: getIcon(selectedKeys, "3-1"),
      },
    ],
  },
  {
    key: "4",
    icon: <ReadOutlined />,
    label: "详情列表",
    children: [
      {
        key: "4-1",
        label: "基础详情页",
        icon: getIcon(selectedKeys, "4-1"),
      },
    ],
  },
];
