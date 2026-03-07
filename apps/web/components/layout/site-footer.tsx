import Link from 'next/link';
import { BrandLogo } from '@/components/layout/brand-logo';

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <BrandLogo inverted />
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Premium websites voor ZZP&apos;ers: volledig gebouwd, snel live, eenmalige investering.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/order" className="text-sm hover:text-white transition-colors">
                  Bestellen
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="tel:+31625320367"
                  className="text-sm hover:text-white transition-colors"
                >
                  +31 6 25 32 03 67
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} ZZP Website Platform. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">
              Privacybeleid
            </Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">
              Algemene voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
