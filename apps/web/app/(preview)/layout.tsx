import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Template Preview',
  description: 'Full page preview of a website template',
  robots: 'noindex, nofollow',
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head />
      <body className="m-0 p-0">{children}</body>
    </html>
  );
}
