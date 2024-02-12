"use client";

import { useState } from "react";
import { Layout, Menu } from "antd";

import { sidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { role } = getUserInfo() as any;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "1.5rem",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: ".5rem",
          marginTop: ".5rem",
          padding: "10px 0px",
        }}
      >
        {role === "merchant"
          ? "Merchant Dashboard"
          : role === "admin"
          ? "Admin Dashboard"
          : role === "raider"
          ? "Raider Dashboard"
          : role === "super_admin"
          ? "Super Admin Dashboard"
          : "Dashboard"}
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(role)}
      />
    </Sider>
  );
};

export default SideBar;
