'use client';

import CustomCursor from './components/CustomCursor';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <CustomCursor />
    </>
  );
} 