import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Template Preview',
  description: 'Full page preview of a website template',
  robots: 'noindex, nofollow',
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <div className="m-0 p-0">{children}</div>;
}
