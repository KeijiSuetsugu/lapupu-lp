import Image from "next/image";
import { StaffItem, SiteSettings } from "@/lib/types";
import { getHeadingSize, getBodySize } from "@/lib/fontSizes";

interface Props {
  data: StaffItem[];
  settings?: SiteSettings;
}

export default function StaffSection({ data, settings }: Props) {
  return (
    <section className="section-padding bg-luxury-light">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lapupu-gold text-xs tracking-[0.4em] mb-4 uppercase">
            Staff
          </p>
          <h2 className={`${getHeadingSize(settings)} font-light text-lapupu-navy`}>
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
                {member.role}
              </p>
              <h3 className="text-xl font-medium text-lapupu-navy mb-4">
                {member.name}
              </h3>
              <div className="h-px w-8 bg-lapupu-gold mx-auto mb-4" />
              <p className={`text-gray-500 font-light leading-relaxed ${getBodySize(settings)} whitespace-pre-wrap`}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
