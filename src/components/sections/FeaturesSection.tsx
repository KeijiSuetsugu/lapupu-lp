import { Sparkles, Heart, Clock, Star, Leaf, Shield } from "lucide-react";
import { FeatureItem } from "@/lib/types";

interface Props {
  data: FeatureItem[];
}

const iconMap: Record<string, React.ElementType> = {
  sparkles: Sparkles,
  heart: Heart,
  clock: Clock,
  star: Star,
  leaf: Leaf,
  shield: Shield,
};

export default function FeaturesSection({ data }: Props) {
  return (
    <section className="section-padding bg-lapupu-beige">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lapupu-gold text-xs tracking-[0.4em] mb-4 uppercase">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-lapupu-navy">
            Lapuppuが選ばれる理由
          </h2>
          <div className="h-px w-12 bg-lapupu-gold mx-auto mt-6" />
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {data.map((feature, i) => {
            const Icon = iconMap[feature.icon] ?? Sparkles;
            return (
              <div
                key={i}
                className="bg-white p-8 text-center group hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lapupu-beige mb-6 group-hover:bg-lapupu-navy transition-colors duration-300">
                  <Icon className="w-7 h-7 text-lapupu-navy group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-medium text-lapupu-navy mb-4 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-gray-500 font-light leading-relaxed text-sm whitespace-pre-wrap">
                  {feature.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
