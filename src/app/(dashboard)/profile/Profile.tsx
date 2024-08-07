"use client";

import { useEditProfile } from "@/hooks/EditProfile.hook";
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

export default function Profile() {
  const { onFinish, loading, disabledDate } = useEditProfile();

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <Card>
        <Typography.Title level={1} className="!font-semibold !text-xl">
          Edit Profile
        </Typography.Title>
        <Typography.Paragraph>
          Please fill out the form below to edit your profile.
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
          <Button
            htmlType="submit"
            type="primary"
            block
            className="mt-4"
            disabled={loading}
          >
            Update Profile
          </Button>
        </Form>
      </Card>
    </div>
  );
}
