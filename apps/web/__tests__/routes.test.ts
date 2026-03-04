import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

describe('static routes', () => {
  const appDir = join(process.cwd(), 'app');
  const marketingComponentsDir = join(process.cwd(), 'components', 'marketing');

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

  it('simple pricing section includes garantie and beschikbaarheid messaging', () => {
    const pricingSection = readFileSync(join(marketingComponentsDir, 'simple-pricing-section.tsx'), 'utf-8');

    expect(pricingSection).toContain('Één vaste prijs: €{FIXED_PRICE}');
    expect(pricingSection).toContain('Geen contracten, geen verborgen kosten en geen onverwachte toeslagen.');
    expect(pricingSection).toContain('Garantie');
    expect(pricingSection).toContain('Niet tevreden in de eerste 48 uur na oplevering? Dan krijg je je geld terug.');
    expect(pricingSection).toContain('Volledige uitvoering door ons team.');
    expect(pricingSection).toContain('Plan jouw website nu');
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
});
