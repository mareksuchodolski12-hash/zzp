import { afterEach, beforeEach, describe, it, expect } from 'vitest';
import { resolveSanityProjectId } from '../lib/sanity-env';

describe('resolveSanityProjectId', () => {
  let originalPublicProjectId: string | undefined;
  let originalStudioProjectId: string | undefined;

  beforeEach(() => {
    originalPublicProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    originalStudioProjectId = process.env.SANITY_STUDIO_PROJECT_ID;
  });

  afterEach(() => {
    if (originalPublicProjectId === undefined) {
      delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    } else {
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = originalPublicProjectId;
    }

    if (originalStudioProjectId === undefined) {
      delete process.env.SANITY_STUDIO_PROJECT_ID;
    } else {
      process.env.SANITY_STUDIO_PROJECT_ID = originalStudioProjectId;
    }
  });

  it('prefers NEXT_PUBLIC_SANITY_PROJECT_ID', () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'public-project';
    process.env.SANITY_STUDIO_PROJECT_ID = 'studio-project';
    expect(resolveSanityProjectId()).toBe('public-project');
  });

  it('falls back to SANITY_STUDIO_PROJECT_ID', () => {
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    process.env.SANITY_STUDIO_PROJECT_ID = 'studio-project';
    expect(resolveSanityProjectId()).toBe('studio-project');
  });

  it('returns empty string when both env vars are missing', () => {
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    delete process.env.SANITY_STUDIO_PROJECT_ID;
    expect(resolveSanityProjectId()).toBe('');
  });
});
