import type { Metadata } from 'next';
import './globals.css';

const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? 'Jouw Bedrijf';
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@jouwbedrijf.nl';

export const metadata: Metadata = {
  title: {
    default: businessName,
    template: `%s | ${businessName}`,
  },
  description: `Officiële website van ${businessName}. Neem contact op via ${contactEmail}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
