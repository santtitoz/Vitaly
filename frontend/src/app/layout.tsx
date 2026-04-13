import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Vitaly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
