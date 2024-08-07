"use client";

import { categoryService } from "@/services/apis/category";
import { CategoryUrl } from "@/services/urls/category";
import { Button, Card, Table, Typography } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import * as React from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function Categories() {
  const { data: categories, isLoading } = useSWR(CategoryUrl, () =>
    categoryService.getCategories()
  );

  const { trigger: deleteCategory, isMutating: loading } = useSWRMutation(
    CategoryUrl,
    (_, { arg }: { arg: string }) => {
      return categoryService.deleteCategory(arg);
    }
  );

  const dataSource: any = categories
    ? (categories as any).data.data.map((category: any, index: number) => ({
        ...category,
        key: index + 1,
      }))
    : [];

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Description",
      dataIndex: "category_description",
      key: "category_description",
    },
    {
      title: "Action",
      render: (record: any) => {
        return (
          <div className="flex items-center">
            <Button type="text">
              <Link href={`/categories/${record.id}`}>
                <EyeOutlined
                  style={{ fontSize: 20 }}
                  className="!text-blue-500"
                />
              </Link>
            </Button>
            <Button type="text" onClick={() => deleteCategory(record.id)}>
              <DeleteOutlined
                style={{ fontSize: 20 }}
                className="!text-red-500"
              />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex-1 shrink-0">
          <Typography.Title level={1} className="!font-semibold !text-xl">
            Categories
          </Typography.Title>
          <Typography.Paragraph>
            This is where you can manage your categories and see their products.
          </Typography.Paragraph>
        </div>
        <Link href={"/categories/add"}>
          <Button type="primary">Add Category</Button>
        </Link>
      </div>
      <Card>
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={isLoading || loading}
        />
      </Card>
    </>
  );
}
