import * as React from "react";
import { Metadata } from "next";
import AddProduct from "./AddProduct";

export const metadata: Metadata = {
  title: "Add Product - Inventory Management",
};

export default function AddProductPage() {
  return <AddProduct />;
}
