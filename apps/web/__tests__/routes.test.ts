import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

describe('static routes', () => {
  const appDir = join(process.cwd(), 'app');
  const marketingComponentsDir = join(process.cwd(), 'components', 'marketing');
  const layoutComponentsDir = join(process.cwd(), 'components', 'layout');

  it('preview layout does not define nested html/body tags', () => {
    const previewLayout = readFileSync(join(appDir, '(preview)', 'layout.tsx'), 'utf-8');

    expect(previewLayout).not.toContain('<html');
    expect(previewLayout).not.toContain('<body');
  });

  it('preview route guards against missing slug params', () => {
    const previewPage = readFileSync(join(appDir, '(preview)', 'preview', '[slug]', 'page.tsx'), 'utf-8');

    expect(previewPage).toContain('if (!slug)');
    expect(previewPage).toContain('notFound()');
  });

  it('includes privacy and terms routes referenced in footer', () => {
    expect(existsSync(join(appDir, '(marketing)', 'privacy', 'page.tsx'))).toBe(true);
    expect(existsSync(join(appDir, '(marketing)', 'terms', 'page.tsx'))).toBe(true);
  });

  it('privacy and terms pages include expected headings', () => {
    const privacyPage = readFileSync(join(appDir, '(marketing)', 'privacy', 'page.tsx'), 'utf-8');
    const termsPage = readFileSync(join(appDir, '(marketing)', 'terms', 'page.tsx'), 'utf-8');

    expect(privacyPage).toContain('Privacybeleid');
    expect(termsPage).toContain('Algemene voorwaarden');
  });

  it('simple pricing section includes two-package and installment messaging', () => {
    const pricingSection = readFileSync(join(marketingComponentsDir, 'simple-pricing-section.tsx'), 'utf-8');

    expect(pricingSection).toContain('Kies het pakket dat past bij jouw bedrijf');
    expect(pricingSection).toContain('Start met Starter');
    expect(pricingSection).toContain('Kies Business');
    expect(pricingSection).toContain('Betaling in termijnen tot 12 maanden mogelijk');
    expect(pricingSection).toContain('Betaalopties');
    expect(pricingSection).toContain('Geen verborgen kosten. Geen technische rompslomp. Gewoon een snelle, professionele website die werkt.');
  });

  it('testimonials section includes updated examples', () => {
    const testimonialsSection = readFileSync(
      join(process.cwd(), 'components', 'marketing', 'testimonials-section.tsx'),
      'utf-8'
    );

    expect(testimonialsSection).toContain('LenaSinger.nl');
    expect(testimonialsSection).toContain('MSHydroPro.nl');
    expect(testimonialsSection).toContain('SystemPilot.nl');
  });

  it('site header and mobile menu expose accessible navigation controls', () => {
    const siteHeader = readFileSync(join(layoutComponentsDir, 'site-header.tsx'), 'utf-8');
    const mobileMenu = readFileSync(join(layoutComponentsDir, 'mobile-menu.tsx'), 'utf-8');

    expect(siteHeader).toContain('aria-label="Hoofdnavigatie"');
    expect(siteHeader).toContain('<MobileMenu />');

    expect(mobileMenu).toContain('aria-expanded={isOpen}');
    expect(mobileMenu).toContain('aria-controls="mobile-menu"');
    expect(mobileMenu).toContain('aria-label={isOpen ?');
    expect(mobileMenu).toContain('aria-label="Mobiele navigatie"');
    expect(siteHeader).toContain('role="navigation"');
  });
});
