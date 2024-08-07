"use client";

import { useAddCategory } from "@/hooks/Category.hook";
import { useAddProduct, useEditProduct } from "@/hooks/Product.hook";
import { messageContent } from "@/stores/atom";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function UpdateProduct() {
  const router = useRouter();
  const setMessage = useSetAtom(messageContent);
  const {
    product,
    editProduct,
    category,
    isLoading,
    isMutating,
    isLoadingCategory,
  } = useEditProduct();

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <Card>
        <Typography.Title level={1} className="!font-semibold !text-xl">
          Edit Product
        </Typography.Title>
        <Typography.Paragraph>
          Edit the product and fill out the form below to edit the product.
        </Typography.Paragraph>
        <Divider />
        {isLoading && !product ? (
          <div className="flex flex-col w-full gap-4">
            <Space direction="vertical" className="w-full">
              <Skeleton.Input active />
              <Skeleton.Input active block size="small" />
            </Space>
            <Space direction="vertical" className="w-full">
              <Skeleton.Input active />
              <Skeleton.Input active block size="small" />
            </Space>
            <Space direction="vertical" className="w-full">
              <Skeleton.Input active />
              <Skeleton.Input active block size="small" />
            </Space>
            <Space direction="vertical" className="w-full">
              <Skeleton.Input active />
              <Skeleton.Input active block size="small" />
            </Space>
            <Space direction="vertical" className="w-full">
              <Skeleton.Input active block size="small" />
            </Space>
          </div>
        ) : (
          <Form
            layout="vertical"
            requiredMark={false}
            initialValues={{
              ...product.data.data,
              category_id: product.data.data.category.id,
            }}
            onFinish={(values) => {
              editProduct(values, {
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
                disabled={isLoadingCategory}
                showSearch
                className="!w-full"
                placeholder="Search to Select category"
                optionFilterProp="label"
                filterSort={(optionA: any, optionB: any) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={(category as any)?.data?.data?.map(
                  (category: any) => ({
                    value: category.id as string,
                    label: category.category_name as string,
                  })
                )}
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
        )}
      </Card>
    </div>
  );
}
