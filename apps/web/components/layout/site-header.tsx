'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/components/layout/brand-logo';
import { MobileMenu } from '@/components/layout/mobile-menu';

const marketingLinks = [
  { href: '/', label: 'Home' },
  { href: '/#sociale-bewijzen', label: 'Voorbeelden' },
];

export function SiteHeader() {

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{ '--site-header-height': '4rem' } as CSSProperties}
    >
      <div className="container relative z-50 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <BrandLogo />
        </Link>

        <nav role="navigation" aria-label="Hoofdnavigatie" className="hidden items-center gap-6 lg:flex">
          {marketingLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/order">
            <Button size="sm">Bestel nu</Button>
          </Link>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
