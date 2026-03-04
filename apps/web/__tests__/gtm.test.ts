import { describe, expect, it } from 'vitest';
import { buildGtmNoScriptSrc, buildGtmScript, normalizeGtmId } from '../lib/gtm';

describe('buildGtmScript', () => {
  it('builds the standard GTM bootstrap script with provided id', () => {
    const script = buildGtmScript('GTM-TEST123');

    expect(script).toContain('https://www.googletagmanager.com/gtm.js?id=');
    expect(script).toContain("'dataLayer'");
    expect(script).toContain('"GTM-TEST123"');
  });

  it('escapes potentially malicious characters in GTM id', () => {
    const script = buildGtmScript('GTM-ABC";alert(1);//');
    expect(script).toContain('"GTM-ABC\\";alert(1);//"');
  });
});

describe('buildGtmNoScriptSrc', () => {
  it('encodes GTM id in noscript iframe url', () => {
    expect(buildGtmNoScriptSrc('GTM-TEST123')).toBe('https://www.googletagmanager.com/ns.html?id=GTM-TEST123');
    expect(buildGtmNoScriptSrc('GTM-ABC 123')).toBe('https://www.googletagmanager.com/ns.html?id=GTM-ABC%20123');
  });
});

describe('normalizeGtmId', () => {
  it('returns normalized id when format is valid', () => {
    expect(normalizeGtmId(' GTM-TEST123 ')).toBe('GTM-TEST123');
  });

  it('returns null for invalid ids', () => {
    expect(normalizeGtmId('')).toBeNull();
    expect(normalizeGtmId('G-TEST123')).toBeNull();
    expect(normalizeGtmId('GTM-abc123')).toBeNull();
    expect(normalizeGtmId('GTM-TEST@123')).toBeNull();
    expect(normalizeGtmId('GTM-TEST123<script>')).toBeNull();
  });
});
