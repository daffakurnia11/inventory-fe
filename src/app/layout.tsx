import Message from "@/components/Message";
import "@/styles/globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-slate-100">
        <AntdRegistry>{children}</AntdRegistry>
        <Message />
      </body>
    </html>
  );
}
