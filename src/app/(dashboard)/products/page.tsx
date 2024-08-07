import { Metadata } from "next";
import * as React from "react";
import Products from "./Products";

export const metadata: Metadata = {
  title: "Products - Inventory Management",
};

export default function ProductPage() {
  return <Products />;
}
