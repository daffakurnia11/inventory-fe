"use client";

import { useAddCategory } from "@/hooks/Category.hook";
import { messageContent } from "@/stores/atom";
import { Button, Card, Divider, Form, Input, Typography } from "antd";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function AddCategory() {
  const router = useRouter();
  const setMessage = useSetAtom(messageContent);
  const { addCategory, loading } = useAddCategory();

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <Card>
        <Typography.Title level={1} className="!font-semibold !text-xl">
          Add New Category
        </Typography.Title>
        <Typography.Paragraph>
          Add new category and fill out the form below to add new category.
        </Typography.Paragraph>
        <Divider />
        <Form
          layout="vertical"
          requiredMark={false}
          onFinish={(values) =>
            addCategory(values, {
              onSuccess: (response: any) => {
                setMessage({
                  type: "success",
                  message: response.data.message,
                });
                router.push("/categories");
              },
            })
          }
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
            disabled={loading}
          >
            Create Category
          </Button>
        </Form>
      </Card>
    </div>
  );
}
