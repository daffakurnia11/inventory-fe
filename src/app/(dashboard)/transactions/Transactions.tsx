"use client";

import { categoryService } from "@/services/apis/category";
import { CategoryUrl } from "@/services/urls/category";
import { Button, Card, Table, Typography } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import * as React from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { TransactionUrl } from "@/services/urls/transaction";
import { transactionService } from "@/services/apis/transaction";
import dayjs from "dayjs";

export default function Transactions() {
  const { data: transactions, isLoading } = useSWR(TransactionUrl, () =>
    transactionService.getTransactions()
  );

  const dataSource: any = transactions
    ? (transactions as any).data.data.map(
        (transaction: any, index: number) => ({
          ...transaction,
          key: index + 1,
        })
      )
    : [];

  console.log(dataSource);

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (record: any) => {
        return record.product_name;
      },
    },
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
      render: (record: any) => {
        return `${record.first_name} ${record.last_name}`;
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (record: any) => {
        return record === "In" ? "Stock In" : "Stock Out";
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (record: any) => {
        return dayjs(record).format("DD/MM/YYYY HH:mm:ss");
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex-1 shrink-0">
          <Typography.Title level={1} className="!font-semibold !text-xl">
            Transactions
          </Typography.Title>
          <Typography.Paragraph>
            This is where you can manage your transactions.
          </Typography.Paragraph>
        </div>
        <Link href={"/transactions/add"}>
          <Button type="primary">Create Transaction</Button>
        </Link>
      </div>
      <Card>
        <Table dataSource={dataSource} columns={columns} loading={isLoading} />
      </Card>
    </>
  );
}
