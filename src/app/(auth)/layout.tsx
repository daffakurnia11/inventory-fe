import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-dvh w-full flex items-center justify-center py-8 bg-slate-100">
      {children}
    </main>
  );
}
