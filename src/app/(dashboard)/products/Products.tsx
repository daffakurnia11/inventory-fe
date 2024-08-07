"use client";

import ProductCard from "@/components/ProductCard";
import { productService } from "@/services/apis/product";
import { ProductUrl } from "@/services/urls/product";
import { ProductData } from "@/types/product";
import { Button, Card, Typography } from "antd";
import Link from "next/link";
import * as React from "react";
import useSWR from "swr";

export default function Products() {
  const { data, isLoading } = useSWR(ProductUrl, () =>
    productService.getProducts()
  );

  const products: any = data;

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex-1 shrink-0">
          <Typography.Title level={1} className="!font-semibold !text-xl">
            Products
          </Typography.Title>
          <Typography.Paragraph>
            This is a list of products in your inventory database.
          </Typography.Paragraph>
        </div>
        <Link href={"/products/add"}>
          <Button type="primary">Add Product</Button>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {!isLoading
          ? products?.data?.data?.map((product: ProductData, index: number) => (
              <ProductCard key={index} {...product} />
            ))
          : [...Array(8)].map((_, index: number) => (
              <Card loading key={index} />
            ))}
      </div>
    </>
  );
}
