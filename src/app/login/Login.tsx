"use client";

import { useLogin } from "@/hooks/Login.hook";
import { Button, Card, Divider, Form, Input, Typography } from "antd";
import * as React from "react";

export default function Login() {
  const { onFinish, loading } = useLogin();

  return (
    <main className="min-h-dvh w-full flex items-center justify-center">
      <Card className="w-full max-w-[350px] shadow-md">
        <Typography.Title
          level={1}
          className="!font-semibold !text-2xl text-center !mb-1"
        >
          Admin Inventory
        </Typography.Title>
        <Typography.Paragraph className="text-center">
          Welcome back! Please login to continue.
        </Typography.Paragraph>
        <Divider />
        <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
          <Form.Item
            label="Email"
            name={"email"}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name={"password"}
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            block
            className="mt-4"
            disabled={loading}
          >
            Login
          </Button>
        </Form>
        <Divider />
        <Typography.Paragraph className="text-center">
          Don&apos;t have an account?{" "}
          <Typography.Link href="/register">Register</Typography.Link>
        </Typography.Paragraph>
      </Card>
    </main>
  );
}
