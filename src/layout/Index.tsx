import React, { useState, useEffect } from "react";
import { Avatar, Layout, theme, Button } from "antd";
import { UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import MySider from "./Sider";
import lightPng from "@/assets/png/light.png";

const { Header, Content, Sider } = Layout;

const MyLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 检测屏幕尺寸，在小屏幕上自动折叠侧边栏
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !collapsed) {
        setCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [collapsed]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          trigger={null}
          style={{
            background: colorBgContainer,
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 1000,
          }}
        >
          <MySider collapsed={collapsed} />
        </Sider>
      )}

      <Layout
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: !isMobile && !collapsed ? "200px" : !isMobile && collapsed ? "80px" : "0",
          transition: "margin-left 0.2s",
        }}
      >
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            padding: "0 24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {!isMobile && (
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleCollapsed}
                style={{ fontSize: "16px" }}
              />
            )}
            {isMobile && (
              <Button
                type="text"
                icon={<MenuUnfoldOutlined />}
                onClick={toggleCollapsed}
                style={{ fontSize: "16px" }}
              />
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <img className="cursor-pointer" src={lightPng} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Avatar className="cursor-pointer" size={24} icon={<UserOutlined />} />
              <span className="cursor-pointer">用户信息</span>
            </div>
          </div>
        </Header>
        <Content
          className="p-4 md:p-7.5"
          style={{
            flex: 1,
            overflow: "auto",
            minHeight: 0,
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      {/* 移动端侧边栏遮罩 */}
      {isMobile && !collapsed && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* 移动端侧边栏 */}
      {isMobile && !collapsed && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            width: "80%",
            maxWidth: "300px",
            background: colorBgContainer,
            zIndex: 1000,
            overflow: "auto",
            boxShadow: "2px 0 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          <MySider collapsed={false} isMobile={true} />
        </div>
      )}
    </Layout>
  );
};

export default MyLayout;
