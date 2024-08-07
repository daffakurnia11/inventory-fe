"use client";

import * as React from "react";
import { Button, Dropdown, Layout, Menu, MenuProps, Typography } from "antd";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { deleteSession } from "@/utils/session";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const menuItems = [
    {
      key: "1",
      label: "Dashboard",
    },
    {
      key: "2",
      label: "Categories",
    },
    {
      key: "3",
      label: "Products",
    },
    {
      key: "4",
      label: "Transactions",
    },
  ];

  const dropdownItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Edit Profile",
    },
    {
      key: "2",
      label: "Change Password",
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "Logout",
      onClick: () => {
        router.push("/login");
        deleteSession();
      },
    },
  ];

  return (
    <Layout>
      <Layout.Header className="flex items-center justify-center w-full sticky top-0 z-10">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          className="flex-1"
        />
        <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
          <Button type="text" className="!text-white">
            Hi, Daffa
          </Button>
        </Dropdown>
      </Layout.Header>
      <Layout.Content className="bg-slate-100 container mx-auto py-8">
        {children}
      </Layout.Content>
      <Layout.Footer className="text-center">
        <Typography.Paragraph>
          Dafkur ©{new Date().getFullYear()} Created by{" "}
          <Typography.Link href="https://dafkur.com">
            Daffa Kurnia Fatah
          </Typography.Link>
        </Typography.Paragraph>
      </Layout.Footer>
    </Layout>
  );
}
