import Image from "next/image";
import { StaffItem } from "@/lib/types";
import StyledText from "@/components/StyledText";

interface Props {
  data: StaffItem[];
  charStyles?: Record<string, number[]>;
}

export default function StaffSection({ data, charStyles = {} }: Props) {
  return (
    <section className="section-padding bg-luxury-light">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lapupu-gold text-xs tracking-[0.4em] mb-4 uppercase">
            Staff
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-lapupu-navy">
            スタッフ紹介
          </h2>
          <div className="h-px w-12 bg-lapupu-gold mx-auto mt-6" />
        </div>

        {/* Staff cards */}
        <div className="flex flex-wrap justify-center gap-12">
          {data.map((member, i) => (
            <div key={i} className="max-w-sm text-center">
              {/* Photo */}
              <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full border-2 border-lapupu-gold/30 shadow-lg shadow-lapupu-gold/10">
                {member.imageUrl && member.imageUrl !== "/images/staff-1.jpg" ? (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-lapupu-beige to-lapupu-navy/10 flex items-center justify-center">
                    <span className="text-lapupu-navy/30 text-4xl">✦</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <p className="text-lapupu-gold text-xs tracking-[0.3em] mb-2 uppercase">
                <StyledText
                  text={member.role}
                  charSizes={charStyles[`staff.${i}.role`]}
                  defaultSize={12}
                />
              </p>
              <h3 className="font-medium text-lapupu-navy mb-4">
                <StyledText
                  text={member.name}
                  charSizes={charStyles[`staff.${i}.name`]}
                  defaultSize={20}
                />
              </h3>
              <div className="h-px w-8 bg-lapupu-gold mx-auto mb-4" />
              <p className="text-gray-500 font-light leading-relaxed">
                <StyledText
                  text={member.bio}
                  charSizes={charStyles[`staff.${i}.bio`]}
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
