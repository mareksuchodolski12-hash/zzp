import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'ZZP Website Platform | Ready-Made Websites for Self-Employed Professionals',
    template: '%s | ZZP Website Platform',
  },
  description:
    'Launch your professional website in 24 hours. Ready-made templates for ZZP professionals, freelancers and consultants.',
  keywords: ['ZZP', 'website', 'freelancer', 'self-employed', 'professional website', 'template'],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://zzp-platform.nl',
    siteName: 'ZZP Website Platform',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
