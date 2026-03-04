'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const marketingLinks = [
  { href: '/', label: 'Home' },
  { href: '/#sociale-bewijzen', label: 'Voorbeelden' },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="rounded-md border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Menu sluiten' : 'Menu openen'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-[1px] lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Menu */}
      <nav
        id="mobile-menu"
        role="navigation"
        aria-label="Mobiele navigatie"
        className={cn(
          'fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-[85vw] max-w-sm bg-white/95 backdrop-blur-sm transition-transform duration-300 lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex flex-col gap-4 border-l border-gray-200 p-6">
          {marketingLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/order" onClick={() => setIsOpen(false)}>
            <Button size="sm" className="mt-4 w-full">
              Bestel nu
            </Button>
          </Link>
        </div>
      </nav>
    </>
  );
}
