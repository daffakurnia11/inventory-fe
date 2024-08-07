"use client";

import { useAddTransaction } from "@/hooks/Transaction.hook";
import { messageContent } from "@/stores/atom";
import {
  Button,
  Card,
  Divider,
  Form,
  InputNumber,
  Radio,
  Select,
  Typography,
} from "antd";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function AddTransaction() {
  const router = useRouter();
  const setMessage = useSetAtom(messageContent);
  const { addTransaction, products, isLoading, isMutating } =
    useAddTransaction();

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <Card>
        <Typography.Title level={1} className="!font-semibold !text-xl">
          Add New Transaction
        </Typography.Title>
        <Typography.Paragraph>
          Add new transaction and fill out the form below to add new
          transaction.
        </Typography.Paragraph>
        <Divider />
        <Form
          layout="vertical"
          requiredMark={false}
          initialValues={{
            transactions: [{ product_id: "", quantity: 0, state: "In" }],
          }}
          onFinish={(values) =>
            addTransaction(values, {
              onSuccess: (response: any) => {
                setMessage({
                  type: "success",
                  message: response.data.message,
                });
                router.push("/transactions");
              },
            })
          }
        >
          <Form.List name={"transactions"}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, key) => (
                  <div key={key} className="border rounded p-3 mb-3">
                    <Form.Item
                      label="Product"
                      name={[field.name, "product_id"]}
                      rules={[
                        {
                          required: true,
                          message: "Please choose the product",
                        },
                      ]}
                    >
                      <Select
                        disabled={isLoading}
                        showSearch
                        className="!w-full"
                        placeholder="Search to Select product"
                        optionFilterProp="label"
                        filterSort={(optionA: any, optionB: any) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={(products as any)?.data?.data?.map(
                          (product: any) => ({
                            value: product.id as string,
                            label: product.product_name as string,
                          })
                        )}
                      />
                    </Form.Item>
                    <div className="flex gap-3 w-full">
                      <Form.Item
                        label="Quantity"
                        name={[field.name, "quantity"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter the quantity",
                          },
                        ]}
                        className="w-full flex-1 shrink-0"
                      >
                        <InputNumber min={0} rootClassName="!w-full" />
                      </Form.Item>
                      <Form.Item label="State" name={[field.name, "state"]}>
                        <Radio.Group
                          options={[
                            {
                              label: "In",
                              value: "In",
                            },
                            {
                              label: "Out",
                              value: "Out",
                            },
                          ]}
                          optionType="button"
                          buttonStyle="solid"
                        />
                      </Form.Item>
                    </div>
                    {fields.length > 1 && (
                      <Button
                        htmlType="button"
                        type="default"
                        block
                        className="mt-4"
                        onClick={() => remove(field.name)}
                      >
                        Remove column
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  htmlType="button"
                  type="default"
                  block
                  className="mt-4"
                  onClick={() =>
                    add({ product_id: "", quantity: 0, state: "In" })
                  }
                >
                  Add new column
                </Button>
              </>
            )}
          </Form.List>
          <Button
            htmlType="submit"
            type="primary"
            block
            className="mt-4"
            disabled={isMutating}
          >
            Create New Transaction
          </Button>
        </Form>
      </Card>
    </div>
  );
}
