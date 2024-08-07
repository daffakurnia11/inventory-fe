"use client";

import { categoryService } from "@/services/apis/category";
import { CategoryDetailUrl } from "@/services/urls/category";
import { Button, Card, Table, Typography } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as React from "react";
import useSWR from "swr";
import ProductCard from "@/components/ProductCard";
import { ProductData } from "@/types/product";

export default function CategoryDetail() {
  const { id } = useParams();
  const { data, isLoading } = useSWR(CategoryDetailUrl, () =>
    categoryService.detailCategory(id as string)
  );

  const category: any = data;

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

        <div className="grid grid-cols-4 gap-4">
          {category?.data?.data?.products.map(
            (product: ProductData, index: number) => (
              <ProductCard key={index} {...product} />
            )
          )}
        </div>
      </>
    )
  );
}
