import type { Metadata } from 'next';
import './globals.css';

const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? 'Portfolio';

export const metadata: Metadata = {
  title: businessName,
  description: `Portfolio van ${businessName}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
