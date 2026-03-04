'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandLogo } from '@/components/layout/brand-logo';
import { cn } from '@/lib/utils';

const marketingLinks = [
  { href: '/', label: 'Home' },
  { href: '/#sociale-bewijzen', label: 'Voorbeelden' },
];
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousBodyHeight = document.body.style.height;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : '0px';

    const preventScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    document.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      document.body.style.height = previousBodyHeight;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPaddingRight;
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusableElements?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const elements = menuRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);

      if (!elements?.length) {
        return;
      }

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

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

        <button
          ref={menuButtonRef}
          type="button"
          className="rounded-md border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:hidden"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-expanded={isOpen}
          aria-controls="mobile-tablet-menu"
          aria-label={isOpen ? 'Menu sluiten' : 'Menu openen'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={cn(
          'fixed inset-x-0 bottom-0 top-[var(--site-header-height)] z-40 bg-black/50 backdrop-blur-[1px] transition-opacity duration-300 lg:hidden',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={closeMenu}
        aria-hidden={!isOpen}
      >
        <div
          id="mobile-tablet-menu"
          ref={menuRef}
          role="navigation"
          aria-label="Mobiele navigatie"
          className={cn(
            'ml-auto flex h-full w-[85vw] max-w-sm flex-col border-l border-white/70 bg-white/95 px-6 py-6 shadow-2xl backdrop-blur-sm transition-all duration-300',
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <nav className="mt-4 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
            {marketingLinks.map((item) => (
              <Link
                key={`mobile-${item.href}`}
                href={item.href}
                className="rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-200 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/order" onClick={closeMenu}>
              <Button size="sm" className="mt-2 w-full">
                Bestel nu
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
