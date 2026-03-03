import { describe, it, expect } from 'vitest';
import { cn, formatEuro, slugify } from '../lib/utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('deduplicates tailwind classes', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
  });
});

describe('formatEuro', () => {
  it('formats a number as Euro currency', () => {
    expect(formatEuro(299)).toContain('299');
    expect(formatEuro(299)).toContain('€');
  });
});

describe('slugify', () => {
  it('converts text to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Jansen & Partners!')).toBe('jansen-partners');
  });

  it('collapses multiple dashes', () => {
    expect(slugify('hello  world')).toBe('hello-world');
  });
});
