import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { buildGtmNoScriptSrc, buildGtmScript, normalizeGtmId } from '@/lib/gtm';

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
  const gtmId = normalizeGtmId(process.env.NEXT_PUBLIC_GTM_ID);

  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        {gtmId ? <script id="google-tag-manager" dangerouslySetInnerHTML={{ __html: buildGtmScript(gtmId) }} /> : null}
      </head>
      <body className="font-sans">
        {gtmId ? (
          <noscript>
            <iframe
              src={buildGtmNoScriptSrc(gtmId)}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
