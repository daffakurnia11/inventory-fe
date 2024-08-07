"use client";

import Message from "@/components/Message";
import "@/styles/globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { SWRConfig } from "swr";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-slate-100">
        <AntdRegistry>
          <SWRConfig
            value={{
              revalidateOnFocus: false,
              revalidateOnReconnect: false,
            }}
          >
            {children}
          </SWRConfig>
        </AntdRegistry>
        <Message />
      </body>
    </html>
  );
}
