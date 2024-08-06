import * as React from "react";
import Login from "./Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Inventory Management",
};

export default function LoginPage() {
  return <Login />;
}
