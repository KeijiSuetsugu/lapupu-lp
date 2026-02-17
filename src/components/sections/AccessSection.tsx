import { MapPin, Phone, Clock } from "lucide-react";
import { AccessData, SiteSettings } from "@/lib/types";
import { getHeadingSize } from "@/lib/fontSizes";

interface Props {
  data: AccessData;
  settings?: SiteSettings;
}

export default function AccessSection({ data, settings }: Props) {
  return (
    <section className="section-padding bg-luxury-warm">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lapupu-gold text-xs tracking-[0.4em] mb-4 uppercase">
            Access
          </p>
          <h2 className={`${getHeadingSize(settings)} font-light text-lapupu-navy`}>
            アクセス
          </h2>
          <div className="h-px w-12 bg-lapupu-gold mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <div className="aspect-video bg-lapupu-navy/10 overflow-hidden">
            {data.googleMapEmbedUrl ? (
              <iframe
                src={data.googleMapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lapupu アクセスマップ"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lapupu-navy/30">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">地図を設定してください</p>
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-lapupu-navy/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-lapupu-navy" />
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] text-lapupu-gold mb-1 uppercase">
                  Address
                </p>
                <p className="text-lapupu-navy font-light leading-relaxed">
                  {data.address}
                </p>
              </div>
            </div>

            {/* Tel */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-lapupu-navy/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-lapupu-navy" />
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] text-lapupu-gold mb-1 uppercase">
                  Contact
                </p>
                <p className="text-lapupu-navy font-light">{data.tel}</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-lapupu-navy/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-lapupu-navy" />
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] text-lapupu-gold mb-3 uppercase">
                  Hours
                </p>
                <div className="space-y-2">
                  {data.hours.map((hour, i) => (
                    <div key={i} className="flex gap-4 text-sm">
                      <span className="text-lapupu-navy/60 w-28 font-light">
                        {hour.days}
                      </span>
                      <span className="text-lapupu-navy font-medium">
                        {hour.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
