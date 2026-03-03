'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/components/layout/brand-logo';

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <BrandLogo />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/order">
            <Button size="sm">Bestel nu</Button>
          </Link>
        </nav>

        <button
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-tablet-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div id="mobile-tablet-menu" className="lg:hidden border-t bg-white animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="container flex flex-col gap-3 py-4">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors px-1 py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#sociale-bewijzen"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors px-1 py-2"
              onClick={() => setIsOpen(false)}
            >
              Voorbeelden
            </Link>
            <Link href="/order" onClick={() => setIsOpen(false)}>
              <Button size="sm" className="w-full">
                Bestel nu
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
