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
  const settings = content.settings;

  return (
    <main>
      <HeroSection data={content.hero} settings={settings} />
      <ConceptSection data={content.concept} settings={settings} />
      <FeaturesSection data={content.features} settings={settings} />
      <MenuSection data={content.menu} settings={settings} />
      <VoiceSection data={content.voice} settings={settings} />
      <StaffSection data={content.staff} settings={settings} />
      <AccessSection data={content.access} settings={settings} />
      <ContactSection data={content.contact} settings={settings} />
      <Footer data={content.footer} />
    </main>
  );
}
