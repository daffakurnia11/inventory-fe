"use client";

import { Button, Card, Typography } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import * as React from "react";
import { ProductData } from "@/types/product";

export default function ProductCard(product: ProductData) {
  return (
    <Card
      title={product.product_name}
      actions={[
        <Button key={"detail"} type="text">
          <Link href={`/products/${product.id}`}>
            <EyeOutlined style={{ fontSize: 16 }} className="!text-blue-500" />
          </Link>
        </Button>,
        <Button
          key={"delete"}
          type="text"
          onClick={() => console.log(product.id)}
        >
          <DeleteOutlined style={{ fontSize: 16 }} className="!text-red-500" />
        </Button>,
      ]}
    >
      <Typography.Paragraph>{product.product_description}</Typography.Paragraph>
      <Card.Meta description={`Stock : ${product.stock}`} />
      {product.category && (
        <Card.Meta
          description={`Category : ${product.category.category_name}`}
        />
      )}
    </Card>
  );
}
