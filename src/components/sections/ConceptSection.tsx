import Image from "next/image";
import { ConceptData } from "@/lib/types";
import StyledText from "@/components/StyledText";

interface Props {
  data: ConceptData;
  charStyles?: Record<string, number[]>;
  imagePositions?: Record<string, { x: number; y: number }>;
}

export default function ConceptSection({ data, charStyles = {}, imagePositions = {} }: Props) {
  return (
    <section className="section-padding bg-organic-light">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] bg-lapupu-cream overflow-hidden rounded-[30%_70%_70%_30%/30%_30%_70%_70%]">
            {data.imageUrl && data.imageUrl !== "/images/concept.jpg" ? (
              <Image
                src={data.imageUrl}
                alt="Lapupu コンセプト"
                fill
                className="object-cover"
                style={imagePositions["concept.image"] ? { objectPosition: `${imagePositions["concept.image"].x}% ${imagePositions["concept.image"].y}%` } : undefined}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-lapupu-cream to-lapupu-green/20 flex items-center justify-center">
                <div className="text-center text-lapupu-brown/30">
                  <div className="text-6xl mb-4">🌿</div>
                  <p className="text-sm tracking-widest">PHOTO</p>
                </div>
              </div>
            )}
          </div>

          {/* Text */}
          <div>
            <p className="text-lapupu-green text-xs tracking-[0.4em] mb-4 uppercase">
              Concept
            </p>
            <h2 className="font-light text-lapupu-brown mb-8 leading-snug">
              <StyledText
                text={data.title}
                charSizes={charStyles["concept.title"]}
                defaultSize={30}
              />
            </h2>
            <div className="h-px w-12 bg-lapupu-green mb-8" />
            <div className="text-lapupu-brown-light font-light leading-relaxed">
              <StyledText
                text={data.body}
                charSizes={charStyles["concept.body"]}
                defaultSize={14}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
