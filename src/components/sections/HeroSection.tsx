"use client";

import Image from "next/image";
import { HeroData } from "@/lib/types";
import StyledText from "@/components/StyledText";

interface Props {
  data: HeroData;
  charStyles?: Record<string, number[]>;
  imagePositions?: Record<string, { x: number; y: number }>;
}

export default function HeroSection({ data, charStyles = {}, imagePositions = {} }: Props) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {data.bgImageUrl && data.bgImageUrl !== "/images/hero-bg.jpg" ? (
          <Image
            src={data.bgImageUrl}
            alt="Lapupu ヘッドケアサロン"
            fill
            className="object-cover"
            style={imagePositions["hero.bgImage"] ? { objectPosition: `${imagePositions["hero.bgImage"].x}% ${imagePositions["hero.bgImage"].y}%` } : undefined}
            priority
          />
        ) : (
          <div className="w-full h-full bg-organic-cream" />
        )}
        <div className="absolute inset-0 bg-lapupu-cream/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Label */}
        <p className="text-sm md:text-base tracking-[0.3em] text-lapupu-green mb-8 font-light uppercase">
          Head Care Salon
        </p>

        {/* Main catchcopy */}
        <h1 className="font-medium text-lapupu-brown leading-tight mb-6 tracking-wide">
          <StyledText
            text={data.catchcopy}
            charSizes={charStyles["hero.catchcopy"]}
            defaultSize={40}
            className="block"
          />
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-lapupu-green/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-lapupu-green/70" />
          <div className="h-px w-16 bg-lapupu-green/50" />
        </div>

        {/* Subtext */}
        <p className="text-lapupu-brown-light mb-12 font-light tracking-wider">
          <StyledText
            text={data.subtext}
            charSizes={charStyles["hero.subtext"]}
            defaultSize={18}
          />
        </p>

        {/* CTA Button */}
        <a
          href={data.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-lapupu-green text-white px-10 py-4 text-sm md:text-base tracking-[0.2em] font-medium rounded-full hover:bg-lapupu-brown hover:text-white transition-all duration-300 shadow-md hover:shadow-lg group"
        >
          <span>
            <StyledText
              text={data.ctaLabel}
              charSizes={charStyles["hero.ctaLabel"]}
              defaultSize={14}
            />
          </span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-lapupu-brown-light/60 text-xs tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-12 bg-lapupu-brown-light/30 animate-pulse" />
      </div>
    </section>
  );
}
