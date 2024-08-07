"use client";

import * as React from "react";
import { Button, Dropdown, Layout, Menu, MenuProps, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { deleteSession, getSession } from "@/utils/session";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  console.log(pathname);

  const router = useRouter();

  const session = getSession();

  const [render, setRender] = React.useState(false);

  const menuItems = [
    {
      key: "/",
      label: <Link href={"/"}>Dashboard</Link>,
    },
    {
      key: "/categories",
      label: "Categories",
    },
    {
      key: "/products",
      label: "Products",
    },
    {
      key: "/transactions",
      label: "Transactions",
    },
  ];

  const dropdownItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={"/profile"}>Edit Profile</Link>,
    },
    {
      key: "2",
      label: <Link href={"/change-password"}>Change Password</Link>,
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

  React.useEffect(() => {
    if (session) {
      setRender(true);
    }
  }, [session]);

  return (
    render && (
      <Layout className="h-full">
        <Layout.Header className="flex items-center justify-center w-full sticky top-0 z-10">
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[`${pathname}`]}
            items={menuItems}
            className="flex-1"
          />
          <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
            <Button type="text" className="!text-white">
              Hi, {session.user.first_name} {session.user.last_name}{" "}
              <DownOutlined />
            </Button>
          </Dropdown>
        </Layout.Header>
        <Layout.Content className="bg-slate-100 container mx-auto py-8 flex-1 h-full">
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
    )
  );
}
