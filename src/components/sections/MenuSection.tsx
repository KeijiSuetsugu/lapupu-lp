import { MenuItem, SiteSettings } from "@/lib/types";
import { getHeadingSize, getBodySize } from "@/lib/fontSizes";

interface Props {
  data: MenuItem[];
  settings?: SiteSettings;
}

export default function MenuSection({ data, settings }: Props) {
  return (
    <section className="section-padding bg-luxury-gradient">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lapupu-gold text-xs tracking-[0.4em] mb-4 uppercase">
            Menu & Price
          </p>
          <h2 className={`${getHeadingSize(settings)} font-light text-lapupu-navy`}>
            メニュー・料金
          </h2>
          <div className="h-px w-12 bg-lapupu-gold mx-auto mt-6" />
        </div>

        {/* Menu items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {data.map((item, i) => (
            <div
              key={i}
              className="border border-lapupu-gold/10 bg-white p-6 md:p-8 hover:border-lapupu-gold/40 hover:shadow-lg hover:shadow-lapupu-gold/5 transition-all duration-500 group"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-lapupu-navy mb-2 group-hover:text-lapupu-navy-dark">
                    {item.name}
                  </h3>
                  <p className={`text-gray-500 font-light ${getBodySize(settings)} leading-relaxed whitespace-pre-wrap`}>
                    {item.description}
                  </p>
                </div>
                <div className="md:ml-8 flex-shrink-0">
                  <span className="text-2xl md:text-3xl font-light text-lapupu-navy tracking-wider">
                    {item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-gray-400 text-xs mt-8 tracking-wide">
          ※ 料金はすべて税込みです
        </p>
      </div>
    </section>
  );
}
