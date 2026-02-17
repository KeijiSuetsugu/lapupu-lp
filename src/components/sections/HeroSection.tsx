"use client";

import Image from "next/image";
import { HeroData, SiteSettings } from "@/lib/types";
import { getHeroSize } from "@/lib/fontSizes";

interface Props {
  data: HeroData;
  settings?: SiteSettings;
}

export default function HeroSection({ data, settings }: Props) {
  const lines = data.catchcopy.split("\n");

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
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-lapupu-navy-dark via-lapupu-navy to-lapupu-navy-light" />
        )}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        {/* Label */}
        <p className="text-sm md:text-base tracking-[0.3em] text-lapupu-gold mb-8 font-light uppercase">
          Head Care Salon
        </p>

        {/* Main catchcopy */}
        <h1 className={`${getHeroSize(settings)} font-light leading-tight mb-6 tracking-wide`}>
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-lapupu-gold/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-lapupu-gold/80" />
          <div className="h-px w-16 bg-lapupu-gold/60" />
        </div>

        {/* Subtext */}
        <p className="text-base md:text-lg text-white/80 mb-12 font-light tracking-wider">
          {data.subtext}
        </p>

        {/* CTA Button */}
        <a
          href={data.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-lapupu-navy px-10 py-4 text-sm md:text-base tracking-[0.2em] font-medium hover:bg-lapupu-gold hover:text-white transition-all duration-300 group"
        >
          <span>{data.ctaLabel}</span>
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
        <span className="text-white/60 text-xs tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-12 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}
