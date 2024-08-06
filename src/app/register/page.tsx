import * as React from "react";
import { Metadata } from "next";
import Register from "./Register";

export const metadata: Metadata = {
  title: "Register - Inventory Management",
};

export default function RegisterPage() {
  return <Register />;
}
