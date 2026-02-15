import { Star } from "lucide-react";
import { VoiceItem } from "@/lib/types";

interface Props {
  data: VoiceItem[];
}

export default function VoiceSection({ data }: Props) {
  return (
    <section className="section-padding bg-lapupu-navy">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lapupu-gold text-xs tracking-[0.4em] mb-4 uppercase">
            Voice
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-white">
            お客様の声
          </h2>
          <div className="h-px w-12 bg-lapupu-gold mx-auto mt-6" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {data.map((voice, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: voice.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-lapupu-gold text-lapupu-gold"
                  />
                ))}
              </div>

              {/* Quote mark */}
              <div className="text-lapupu-gold/30 text-5xl font-serif leading-none mb-4">
                &ldquo;
              </div>

              {/* Text */}
              <p className="text-white/80 font-light leading-relaxed text-sm mb-6 whitespace-pre-wrap">
                {voice.text}
              </p>

              {/* Name */}
              <p className="text-lapupu-gold text-sm tracking-wider border-t border-white/10 pt-4">
                {voice.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
