import * as React from "react";
import { Metadata } from "next";
import UpdateCategory from "./UpdateCategory";

export const metadata: Metadata = {
  title: "Edit Category - Inventory Management",
};

export default function UpdateCategoryPage() {
  return <UpdateCategory />;
}
