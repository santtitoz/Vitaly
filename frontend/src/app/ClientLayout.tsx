'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from "@/components/Sidebar/Sidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return (
      <main style={{ minHeight: '100vh', width: '100vw', background: '#000000' }}>
        {children}
      </main>
    );
  }

  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
