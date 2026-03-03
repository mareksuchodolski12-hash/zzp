import { describe, it, expect } from 'vitest';
import { cn, formatEuro, resolveDatabaseUrl, resolveModeratorToken, slugify } from '../lib/utils';

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

describe('resolveModeratorToken', () => {
  it('prefers MODERATOR_TOKEN', () => {
    process.env.MODERATOR_TOKEN = 'moderator-token';
    process.env.INTERNAL_API_SECRET = 'internal-token';
    expect(resolveModeratorToken()).toBe('moderator-token');
    delete process.env.MODERATOR_TOKEN;
    delete process.env.INTERNAL_API_SECRET;
  });

  it('falls back to INTERNAL_API_SECRET', () => {
    delete process.env.MODERATOR_TOKEN;
    process.env.INTERNAL_API_SECRET = 'internal-token';
    expect(resolveModeratorToken()).toBe('internal-token');
    delete process.env.INTERNAL_API_SECRET;
  });
});

describe('resolveDatabaseUrl', () => {
  it('prefers SUPABASE_DATABASE_URL', () => {
    process.env.SUPABASE_DATABASE_URL = 'postgresql://supabase';
    process.env.DATABASE_URL = 'postgresql://neon';
    expect(resolveDatabaseUrl()).toBe('postgresql://supabase');
    delete process.env.SUPABASE_DATABASE_URL;
    delete process.env.DATABASE_URL;
  });

  it('falls back to DATABASE_URL', () => {
    delete process.env.SUPABASE_DATABASE_URL;
    process.env.DATABASE_URL = 'postgresql://neon';
    expect(resolveDatabaseUrl()).toBe('postgresql://neon');
    delete process.env.DATABASE_URL;
  });
});
