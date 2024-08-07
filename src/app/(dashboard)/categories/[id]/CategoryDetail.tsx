"use client";

import { categoryService } from "@/services/apis/category";
import { CategoryDetailUrl } from "@/services/urls/category";
import { Button, Card, Table, Typography } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as React from "react";
import useSWR from "swr";

export default function CategoryDetail() {
  const { id } = useParams();
  const { data, isLoading } = useSWR(CategoryDetailUrl, () =>
    categoryService.detailCategory(id as string)
  );

  const category: any = data;

  const dataSource: any = category
    ? (category as any).data.data?.products?.map(
        (product: any, index: number) => ({
          ...product,
          key: index + 1,
        })
      )
    : [];

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Description",
      dataIndex: "product_description",
      key: "product_description",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
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
            <Button type="text">
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
    category && (
      <>
        <div className="flex justify-between items-center">
          <div className="flex-1 shrink-0">
            <Typography.Title level={1} className="!font-semibold !text-xl">
              {category.data.data.category_name}
            </Typography.Title>
            <Typography.Paragraph>
              {category.data.data.category_description}
            </Typography.Paragraph>
          </div>
          <Link href={`/categories/${id}/update`}>
            <Button type="primary">Edit Category</Button>
          </Link>
        </div>

        <Card>
          <Table
            dataSource={dataSource}
            columns={columns}
            loading={isLoading}
          />
        </Card>
      </>
    )
  );
}
