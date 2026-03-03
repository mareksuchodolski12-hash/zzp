import { FreelancerNav } from '@/components/nav';
import { FreelancerHero } from '@/components/hero';
import { FreelancerWork } from '@/components/work';
import { FreelancerSkills } from '@/components/skills';
import { FreelancerContact } from '@/components/contact';
import { FreelancerFooter } from '@/components/footer';

export default function HomePage() {
  return (
    <>
      <FreelancerNav />
      <FreelancerHero />
      <FreelancerWork />
      <FreelancerSkills />
      <FreelancerContact />
      <FreelancerFooter />
    </>
  );
}
