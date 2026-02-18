import { Star } from "lucide-react";
import { VoiceItem } from "@/lib/types";
import StyledText from "@/components/StyledText";

interface Props {
  data: VoiceItem[];
  charStyles?: Record<string, number[]>;
}

export default function VoiceSection({ data, charStyles = {} }: Props) {
  return (
    <section className="section-padding bg-luxury-navy">
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
            <div key={i} className="bg-white/5 border border-lapupu-gold/10 p-8 backdrop-blur-sm hover:border-lapupu-gold/30 hover:bg-white/8 transition-all duration-500">
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
              <p className="text-white/80 font-light leading-relaxed mb-6">
                <StyledText
                  text={voice.text}
                  charSizes={charStyles[`voice.${i}.text`]}
                  defaultSize={14}
                />
              </p>

              {/* Name */}
              <p className="text-lapupu-gold tracking-wider border-t border-white/10 pt-4">
                <StyledText
                  text={voice.name}
                  charSizes={charStyles[`voice.${i}.name`]}
                  defaultSize={14}
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
