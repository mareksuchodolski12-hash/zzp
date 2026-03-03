import { PortfolioNav } from '@/components/nav';
import { PortfolioHero } from '@/components/hero';
import { PortfolioGallery } from '@/components/gallery';
import { PortfolioAbout } from '@/components/about';
import { PortfolioContact } from '@/components/contact';
import { PortfolioFooter } from '@/components/footer';

export default function HomePage() {
  return (
    <>
      <PortfolioNav />
      <PortfolioHero />
      <PortfolioGallery />
      <PortfolioAbout />
      <PortfolioContact />
      <PortfolioFooter />
    </>
  );
}
