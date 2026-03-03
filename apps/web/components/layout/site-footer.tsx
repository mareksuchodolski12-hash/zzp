import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-white">ZZP</span>
              <span className="text-xl font-semibold text-gray-400">Website</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Professionele websites voor ZZP&apos;ers. Snel live, geen gedoe, eerlijke prijs.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/templates" className="text-sm hover:text-white transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm hover:text-white transition-colors">
                  Prijzen
                </Link>
              </li>
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
                  href="mailto:info@zzp-website.nl"
                  className="text-sm hover:text-white transition-colors"
                >
                  info@zzp-website.nl
                </a>
              </li>
              <li>
                <a
                  href="tel:+31612345678"
                  className="text-sm hover:text-white transition-colors"
                >
                  +31 6 12 34 56 78
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
