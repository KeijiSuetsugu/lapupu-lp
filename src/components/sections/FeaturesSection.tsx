import { Sparkles, Heart, Clock, Star, Leaf, Shield } from "lucide-react";
import { FeatureItem } from "@/lib/types";
import StyledText from "@/components/StyledText";

interface Props {
  data: FeatureItem[];
  charStyles?: Record<string, number[]>;
}

const iconMap: Record<string, React.ElementType> = {
  sparkles: Sparkles,
  heart: Heart,
  clock: Clock,
  star: Star,
  leaf: Leaf,
  shield: Shield,
};

export default function FeaturesSection({ data, charStyles = {} }: Props) {
  return (
    <section className="section-padding bg-organic-warm">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lapupu-green text-xs tracking-[0.4em] mb-4 uppercase">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-lapupu-brown">
            Lapupuが選ばれる理由
          </h2>
          <div className="h-px w-12 bg-lapupu-green mx-auto mt-6" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {data.map((feature, i) => {
            const Icon = iconMap[feature.icon] ?? Sparkles;
            return (
              <div
                key={i}
                className="bg-white p-8 text-center rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lapupu-green/15 mb-6 group-hover:bg-lapupu-green/25 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-lapupu-green" />
                </div>
                <h3 className="text-lg font-medium text-lapupu-brown mb-4 leading-snug">
                  <StyledText
                    text={feature.title}
                    charSizes={charStyles[`features.${i}.title`]}
                    defaultSize={18}
                  />
                </h3>
                <p className="text-lapupu-brown-light font-light leading-relaxed">
                  <StyledText
                    text={feature.body}
                    charSizes={charStyles[`features.${i}.body`]}
                    defaultSize={14}
                  />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
