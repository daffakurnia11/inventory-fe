import * as React from "react";
import { Metadata } from "next";
import UpdateProduct from "./UpdateProduct";

export const metadata: Metadata = {
  title: "Update Product - Inventory Management",
};

export default function UpdateProductPage() {
  return <UpdateProduct />;
}
