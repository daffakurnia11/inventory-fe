"use client";

import { useRegister } from "@/hooks/Register.hook";
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Typography,
} from "antd";
import * as React from "react";

export default function Register() {
  const { onFinish, loading, disabledDate } = useRegister();

  return (
    <main className="min-h-dvh w-full flex items-center justify-center py-8">
      <Card className="w-full max-w-[400px] shadow-md">
        <Typography.Title
          level={1}
          className="!font-semibold !text-2xl text-center !mb-1"
        >
          Admin Inventory
        </Typography.Title>
        <Typography.Paragraph className="text-center">
          Please register and create your admin account.
        </Typography.Paragraph>
        <Divider />
        <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
          <Form.Item
            label="First Name"
            name={"firstName"}
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name={"lastName"}
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>
          <Form.Item
            label="Birth Date"
            name={"birthDate"}
            rules={[
              { required: true, message: "Please enter your birth date" },
            ]}
          >
            <DatePicker
              format={{
                format: "YYYY-MM-DD",
                type: "mask",
              }}
              placeholder="Select your birth date"
              className="w-full"
              disabledDate={disabledDate}
            />
          </Form.Item>
          <Form.Item
            label="Gender"
            name={"gender"}
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            <Select
              className="w-full"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
              placeholder="Select your gender"
            />
          </Form.Item>
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
          <Form.Item
            label="Confirm Password"
            name={"confirmPassword"}
            rules={[
              { required: true, message: "Please repeat your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Password does not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Repeat your password" />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            block
            className="mt-4"
            disabled={loading}
          >
            Register
          </Button>
        </Form>
        <Divider />
        <Typography.Paragraph className="text-center">
          Already have an account?{" "}
          <Typography.Link href="/login">Login</Typography.Link>
        </Typography.Paragraph>
      </Card>
    </main>
  );
}
