import { afterEach, beforeEach, describe, it, expect } from 'vitest';
import { resolveSanityProjectId } from '../lib/sanity-env';

describe('resolveSanityProjectId', () => {
  let originalPublicProjectId: string | undefined;

  beforeEach(() => {
    originalPublicProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  });

  afterEach(() => {
    if (originalPublicProjectId === undefined) {
      delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    } else {
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = originalPublicProjectId;
    }

  });

  it('returns NEXT_PUBLIC_SANITY_PROJECT_ID when set', () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'public-project';
    expect(resolveSanityProjectId()).toBe('public-project');
  });

  it('returns empty string when NEXT_PUBLIC_SANITY_PROJECT_ID is missing', () => {
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    expect(resolveSanityProjectId()).toBe('');
  });
});
