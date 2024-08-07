import * as React from "react";
import { Metadata } from "next";
import ChangePassword from "./ChangePassword";

export const metadata: Metadata = {
  title: "Change Password - Inventory Management",
};

export default function ChangePasswordPage() {
  return <ChangePassword />;
}
