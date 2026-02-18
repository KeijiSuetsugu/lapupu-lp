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
  const charStyles = content.charStyles ?? {};
  const imagePositions = content.imagePositions ?? {};

  return (
    <main>
      <HeroSection data={content.hero} charStyles={charStyles} imagePositions={imagePositions} />
      <ConceptSection data={content.concept} charStyles={charStyles} imagePositions={imagePositions} />
      <FeaturesSection data={content.features} charStyles={charStyles} />
      <MenuSection data={content.menu} charStyles={charStyles} />
      <VoiceSection data={content.voice} charStyles={charStyles} />
      <StaffSection data={content.staff} charStyles={charStyles} imagePositions={imagePositions} />
      <AccessSection data={content.access} charStyles={charStyles} />
      <ContactSection data={content.contact} charStyles={charStyles} />
      <Footer data={content.footer} charStyles={charStyles} />
    </main>
  );
}
