import { describe, it, expect } from 'vitest';
import { resolveSanityProjectId } from '../lib/sanity-env';

describe('resolveSanityProjectId', () => {
  it('prefers NEXT_PUBLIC_SANITY_PROJECT_ID', () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'public-project';
    process.env.SANITY_STUDIO_PROJECT_ID = 'studio-project';
    expect(resolveSanityProjectId()).toBe('public-project');
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    delete process.env.SANITY_STUDIO_PROJECT_ID;
  });

  it('falls back to SANITY_STUDIO_PROJECT_ID', () => {
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    process.env.SANITY_STUDIO_PROJECT_ID = 'studio-project';
    expect(resolveSanityProjectId()).toBe('studio-project');
    delete process.env.SANITY_STUDIO_PROJECT_ID;
  });
});
