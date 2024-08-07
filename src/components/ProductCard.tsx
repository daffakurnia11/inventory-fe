"use client";

import { Button, Card, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";
import * as React from "react";
import { ProductData } from "@/types/product";
import useSWRMutation from "swr/mutation";
import { ProductUrl } from "@/services/urls/product";
import { productService } from "@/services/apis/product";

export default function ProductCard(product: ProductData) {
  const { trigger: deleteProduct, isMutating } = useSWRMutation(
    ProductUrl,
    (_, { arg }: { arg: string }) => {
      return productService.deleteProduct(arg);
    }
  );

  return (
    <Card
      loading={isMutating}
      title={product.product_name}
      actions={[
        <Button key={"edit"} type="text">
          <Link href={`/products/${product.id}`}>
            <EditOutlined style={{ fontSize: 16 }} className="!text-blue-500" />
          </Link>
        </Button>,
        <Button
          key={"delete"}
          type="text"
          onClick={() => deleteProduct(product.id)}
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
