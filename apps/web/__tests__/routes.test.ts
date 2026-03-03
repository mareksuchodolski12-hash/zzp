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

# copilot/update-garantie-beschikbaarheid-section
  it('simple pricing section includes garantie and beschikbaarheid messaging', () => {
    const pricingSection = readFileSync(join(marketingComponentsDir, 'simple-pricing-section.tsx'), 'utf-8');

    expect(pricingSection).toContain('Garantie');
    expect(pricingSection).toContain('Niet tevreden? 100% geld terug binnen 48 uur — zonder vragen.');
    expect(pricingSection).toContain('Beschikbaarheid');
    expect(pricingSection).toContain('We nemen maximaal 5 projecten per dag aan om kwaliteit te garanderen.');
    expect(pricingSection).toContain('Tijdelijk aanbod: €400 promotieprijs — normaal €499.');
    expect(pricingSection).toContain('Alleen voor de eerste 50 klanten.');
    expect(pricingSection).toContain('Nog maar {availableSpots} van de {PROMOTION_SPOTS_TOTAL} promotieplekken beschikbaar.');
    expect(pricingSection).toContain('Controleer beschikbaarheid');
#
  it('social proof sections include updated stats and examples', () => {
    const socialProofSection = readFileSync(
      join(process.cwd(), 'components', 'marketing', 'social-proof-section.tsx'),
      'utf-8'
    );
    const testimonialsSection = readFileSync(
      join(process.cwd(), 'components', 'marketing', 'testimonials-section.tsx'),
      'utf-8'
    );

    expect(socialProofSection).toContain('500+ gelanceerde websites');
    expect(socialProofSection).toContain('4.9/5 gemiddelde beoordeling');
    expect(socialProofSection).toContain('48 uur gemiddelde oplevering');
    expect(testimonialsSection).toContain('LenaSinger.nl');
    expect(testimonialsSection).toContain('MSHydroPro.nl');
    expect(testimonialsSection).toContain('SystemPilot.nl');
# master
  });
});
