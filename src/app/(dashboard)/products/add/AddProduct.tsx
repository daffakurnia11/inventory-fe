"use client";

import { useAddCategory } from "@/hooks/Category.hook";
import { useAddProduct } from "@/hooks/Product.hook";
import { messageContent } from "@/stores/atom";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
} from "antd";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function AddProduct() {
  const router = useRouter();
  const setMessage = useSetAtom(messageContent);
  const { addProduct, isLoading, isMutating, category } = useAddProduct();

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <Card>
        <Typography.Title level={1} className="!font-semibold !text-xl">
          Add New Product
        </Typography.Title>
        <Typography.Paragraph>
          Add new product and fill out the form below to add new product.
        </Typography.Paragraph>
        <Divider />
        <Form
          layout="vertical"
          requiredMark={false}
          initialValues={{ product_image: "/image.png" }}
          onFinish={(values) => {
            addProduct(values, {
              onSuccess: (response: any) => {
                setMessage({
                  type: "success",
                  message: response.data.message,
                });
                router.push("/products");
              },
            });
          }}
        >
          <Form.Item style={{ display: "none" }} name={"product_image"}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Product Name"
            name={"product_name"}
            rules={[
              { required: true, message: "Please enter the product name" },
            ]}
          >
            <Input placeholder="Product name" />
          </Form.Item>
          <Form.Item
            label="Product Description"
            name={"product_description"}
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea rows={3} placeholder="Product description" />
          </Form.Item>
          <Form.Item
            label="Stock"
            name={"stock"}
            rules={[
              { required: true, message: "Please enter stock of product" },
            ]}
            className="w-full"
          >
            <InputNumber min={0} rootClassName="!w-full" />
          </Form.Item>
          <Form.Item
            label="Category"
            name={"category_id"}
            rules={[
              {
                required: true,
                message: "Please enter the category of product",
              },
            ]}
          >
            <Select
              disabled={isLoading}
              showSearch
              className="!w-full"
              placeholder="Search to Select category"
              optionFilterProp="label"
              filterSort={(optionA: any, optionB: any) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={(category as any)?.data?.data?.map((category: any) => ({
                value: category.id as string,
                label: category.category_name as string,
              }))}
            />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            block
            className="mt-4"
            disabled={isMutating}
          >
            Create Product
          </Button>
        </Form>
      </Card>
    </div>
  );
}
