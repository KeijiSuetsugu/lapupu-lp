import Image from "next/image";
import { ConceptData } from "@/lib/types";

interface Props {
  data: ConceptData;
}

export default function ConceptSection({ data }: Props) {
  const lines = data.body.split("\n");

  return (
    <section className="section-padding bg-luxury-light">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] bg-lapupu-beige overflow-hidden">
            {data.imageUrl && data.imageUrl !== "/images/concept.jpg" ? (
              <Image
                src={data.imageUrl}
                alt="Lapupu コンセプト"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-lapupu-beige to-lapupu-navy/10 flex items-center justify-center">
                <div className="text-center text-lapupu-navy/30">
                  <div className="text-6xl mb-4">✦</div>
                  <p className="text-sm tracking-widest">PHOTO</p>
                </div>
              </div>
            )}
            {/* Decorative double border */}
            <div className="absolute inset-0 border border-lapupu-gold/30 m-3 pointer-events-none" />
            <div className="absolute inset-0 border border-lapupu-gold/15 m-5 pointer-events-none" />
          </div>

          {/* Text */}
          <div>
            <p className="text-lapupu-gold text-xs tracking-[0.4em] mb-4 uppercase">
              Concept
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-lapupu-navy mb-8 leading-snug">
              {data.title}
            </h2>
            <div className="h-px w-12 bg-lapupu-gold mb-8" />
            <div className="space-y-4 text-gray-600 font-light leading-relaxed">
              {lines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
