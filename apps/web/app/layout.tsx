import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: {
    default: 'WebsitePilot.nl | Professionele websites in 48 uur',
    template: '%s | WebsitePilot.nl',
  },
  description:
    'Professionele website in 48 uur, volledig door ons geregeld. Eén vaste prijs, geen contracten en geen verborgen kosten.',
  keywords: ['website laten maken', 'website in 48 uur', 'zzp website', 'full-service webdesign', 'websitepilot'],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.websitepilot.nl',
    siteName: 'WebsitePilot.nl',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className="font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
