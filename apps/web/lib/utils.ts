import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function resolveModeratorToken(): string {
  const token = process.env.MODERATOR_TOKEN || process.env.INTERNAL_API_SECRET;
  if (!token) {
    throw new Error('Missing MODERATOR_TOKEN or INTERNAL_API_SECRET');
  }
  return token;
}

export function resolveDatabaseUrl(): string {
  const databaseUrl = process.env.SUPABASE_DATABASE_URL || process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('Missing SUPABASE_DATABASE_URL or DATABASE_URL');
  }
  return databaseUrl;
}
