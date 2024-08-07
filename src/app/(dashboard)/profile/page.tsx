import * as React from "react";
import Profile from "./Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - Inventory Management",
};

export default function ProfilePage() {
  return <Profile />;
}
