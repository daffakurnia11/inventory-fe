"use client";

import { useEditProfile } from "@/hooks/EditProfile.hook";
import { updateSession } from "@/utils/session";
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Skeleton,
  Space,
  Typography,
} from "antd";
import dayjs from "dayjs";
import * as React from "react";

export default function Profile() {
  const {
    isLoading,
    profileData,
    updateProfile,
    loading,
    disabledDate,
    setMessage,
  } = useEditProfile();

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <Card>
        <Typography.Title level={1} className="!font-semibold !text-xl">
          Edit Profile
        </Typography.Title>
        <Typography.Paragraph>
          Update your profile and fill out the form below to edit your profile.
        </Typography.Paragraph>
        <Divider />
        {isLoading && !profileData ? (
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
              updateProfile(values, {
                onSuccess: (response: any) => {
                  setMessage({
                    type: "success",
                    message: response.data.message,
                  });
                  updateSession(values);
                },
              })
            }
            initialValues={{
              ...profileData?.data.data,
              birthDate: dayjs(profileData?.data.data.birthDate),
            }}
          >
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
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
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
        )}
      </Card>
    </div>
  );
}
