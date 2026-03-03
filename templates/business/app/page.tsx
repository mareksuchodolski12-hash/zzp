import { BusinessNav } from '@/components/nav';
import { BusinessHero } from '@/components/hero';
import { BusinessServices } from '@/components/services';
import { BusinessAbout } from '@/components/about';
import { BusinessContact } from '@/components/contact';
import { BusinessFooter } from '@/components/footer';

export default function HomePage() {
  return (
    <>
      <BusinessNav />
      <BusinessHero />
      <BusinessServices />
      <BusinessAbout />
      <BusinessContact />
      <BusinessFooter />
    </>
  );
}
