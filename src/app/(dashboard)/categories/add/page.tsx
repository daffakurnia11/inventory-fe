import * as React from "react";
import { Metadata } from "next";
import AddCategory from "./AddCategory";

export const metadata: Metadata = {
  title: "Add Category - Inventory Management",
};

export default function AddCategoryPage() {
  return <AddCategory />;
}
