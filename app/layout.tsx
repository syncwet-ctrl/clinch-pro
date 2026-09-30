import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CLINCH · Combat sports',
  description: 'Professional combat sports data, rankings, news and live fight coverage.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
