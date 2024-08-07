import React from "react";
import Transactions from "./Transactions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions - Inventory Management",
};

export default function TransactionsPage() {
  return <Transactions />;
}
