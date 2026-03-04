import { describe, expect, it } from 'vitest';
import { buildGtmNoScriptSrc, buildGtmScript } from '../lib/gtm';

describe('buildGtmScript', () => {
  it('builds the standard GTM bootstrap script with provided id', () => {
    const script = buildGtmScript('GTM-TEST123');

    expect(script).toContain('https://www.googletagmanager.com/gtm.js?id=');
    expect(script).toContain("'dataLayer'");
    expect(script).toContain('"GTM-TEST123"');
  });
});

describe('buildGtmNoScriptSrc', () => {
  it('encodes GTM id in noscript iframe url', () => {
    expect(buildGtmNoScriptSrc('GTM-TEST123')).toBe('https://www.googletagmanager.com/ns.html?id=GTM-TEST123');
    expect(buildGtmNoScriptSrc('GTM-ABC 123')).toBe('https://www.googletagmanager.com/ns.html?id=GTM-ABC%20123');
  });
});
