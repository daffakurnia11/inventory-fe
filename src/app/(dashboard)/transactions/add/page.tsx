import * as React from "react";
import { Metadata } from "next";
import AddTransaction from "./AddTransaction";

export const metadata: Metadata = {
  title: "Add Transaction - Inventory Management",
};

export default function AddTransactionPage() {
  return <AddTransaction />;
}
