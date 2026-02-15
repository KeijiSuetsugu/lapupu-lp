import { getContent } from "@/lib/content";
import HeroSection from "@/components/sections/HeroSection";
import ConceptSection from "@/components/sections/ConceptSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import MenuSection from "@/components/sections/MenuSection";
import VoiceSection from "@/components/sections/VoiceSection";
import StaffSection from "@/components/sections/StaffSection";
import AccessSection from "@/components/sections/AccessSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default async function Home() {
  const content = await getContent();

  return (
    <main>
      <HeroSection data={content.hero} />
      <ConceptSection data={content.concept} />
      <FeaturesSection data={content.features} />
      <MenuSection data={content.menu} />
      <VoiceSection data={content.voice} />
      <StaffSection data={content.staff} />
      <AccessSection data={content.access} />
      <ContactSection data={content.contact} />
      <Footer data={content.footer} />
    </main>
  );
}
