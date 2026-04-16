import React from "react";
import { Avatar, Layout, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import MySider from "./Sider";
import lightPng from "@/assets/png/light.png";

const { Header, Content } = Layout;

const MyLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <MySider />
      <Layout style={{ display: "flex", flexDirection: "column" }}>
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "16px",
            padding: "0 24px",
          }}
        >
          <img className="cursor-pointer" src={lightPng} />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Avatar className="cursor-pointer" size={24} icon={<UserOutlined />} />
            <span className="cursor-pointer">用户信息</span>
          </div>
        </Header>
        <Content
          className="m-7.5"
          style={{
            flex: 1,
            overflow: "auto", // 改为auto，让Content部分出现滚动条
            minHeight: 0, // 重要：让flex item可以收缩
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
