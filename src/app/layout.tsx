import React from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <main style={{ padding: '60px 32px', maxWidth: '1000px', width: '100%', margin: '0 auto', flex: 1 }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
