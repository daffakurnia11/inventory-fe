import React from "react";
import Categories from "./Categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories - Inventory Management",
};

export default function CategoriesPage() {
  return <Categories />;
}
