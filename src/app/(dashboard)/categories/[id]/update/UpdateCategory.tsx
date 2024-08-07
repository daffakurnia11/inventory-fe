"use client";

import { useEditCategory } from "@/hooks/Category.hook";
import { messageContent } from "@/stores/atom";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function UpdateCategory() {
  const router = useRouter();
  const setMessage = useSetAtom(messageContent);
  const { category, editCategory, isLoading, isMutating } = useEditCategory();

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <Card>
        <Typography.Title level={1} className="!font-semibold !text-xl">
          Edit Category
        </Typography.Title>
        <Typography.Paragraph>
          Add new category and fill out the form below to add new category.
        </Typography.Paragraph>
        <Divider />
        {isLoading && !category ? (
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
              <Skeleton.Input active block size="small" />
            </Space>
          </div>
        ) : (
          <Form
            layout="vertical"
            requiredMark={false}
            onFinish={(values) =>
              editCategory(values, {
                onSuccess: (response: any) => {
                  setMessage({
                    type: "success",
                    message: response.data.message,
                  });
                  router.push("/categories/" + category.data.data.id);
                },
              })
            }
            initialValues={category.data.data}
          >
            <Form.Item
              label="Category Name"
              name={"category_name"}
              rules={[
                { required: true, message: "Please enter the category name" },
              ]}
            >
              <Input placeholder="Category name" />
            </Form.Item>
            <Form.Item
              label="Category Description"
              name={"category_description"}
              rules={[
                { required: true, message: "Please enter the description" },
              ]}
            >
              <Input.TextArea rows={3} placeholder="Category description" />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              block
              className="mt-4"
              disabled={isMutating}
            >
              Update Category
            </Button>
          </Form>
        )}
      </Card>
    </div>
  );
}
