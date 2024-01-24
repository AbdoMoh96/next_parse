import React from 'react';
import SessionProvider from "@/Components/SessionProvider/SessionProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <SessionProvider>
        {children}
      </SessionProvider>
      </body>
    </html>
  )
}
