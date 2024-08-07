"use client";

import { useChangePassword } from "@/hooks/EditProfile.hook";
import { Button, Card, Divider, Form, Input, Typography } from "antd";
import * as React from "react";

export default function ChangePassword() {
  const { onFinish, loading } = useChangePassword();

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <Card>
        <Typography.Title level={1} className="!font-semibold !text-xl">
          Change Password
        </Typography.Title>
        <Typography.Paragraph>
          Update your password for more security and privacy.
        </Typography.Paragraph>
        <Divider />
        <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
          <Form.Item
            label="Old Password"
            name={"oldPassword"}
            rules={[
              { required: true, message: "Please enter your old password" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item
            label="New Password"
            name={"newPassword"}
            rules={[
              { required: true, message: "Please enter your new password" },
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
                  if (!value || getFieldValue("newPassword") === value) {
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
            Update Password
          </Button>
        </Form>
      </Card>
    </div>
  );
}
