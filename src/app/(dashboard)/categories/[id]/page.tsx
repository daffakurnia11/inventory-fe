import * as React from "react";
import CategoryDetail from "./CategoryDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category - Inventory Management",
};

export default function CategoryDetailPage() {
  return <CategoryDetail />;
}
