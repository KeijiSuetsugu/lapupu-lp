import { MenuItem } from "@/lib/types";
import StyledText from "@/components/StyledText";

interface Props {
  data: MenuItem[];
  charStyles?: Record<string, number[]>;
}

export default function MenuSection({ data, charStyles = {} }: Props) {
  return (
    <section className="section-padding bg-organic-cream">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lapupu-green text-xs tracking-[0.4em] mb-4 uppercase">
            Menu & Price
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-lapupu-brown">
            メニュー・料金
          </h2>
          <div className="h-px w-12 bg-lapupu-green mx-auto mt-6" />
        </div>

        {/* Menu items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {data.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-medium text-lapupu-brown mb-2">
                    <StyledText
                      text={item.name}
                      charSizes={charStyles[`menu.${i}.name`]}
                      defaultSize={18}
                    />
                  </h3>
                  <p className="text-lapupu-brown-light font-light leading-relaxed">
                    <StyledText
                      text={item.description}
                      charSizes={charStyles[`menu.${i}.description`]}
                      defaultSize={14}
                    />
                  </p>
                </div>
                <div className="md:ml-8 flex-shrink-0">
                  <span className="font-light text-lapupu-green tracking-wider">
                    <StyledText
                      text={item.price}
                      charSizes={charStyles[`menu.${i}.price`]}
                      defaultSize={28}
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-lapupu-brown-light/60 text-xs mt-8 tracking-wide">
          ※ 料金はすべて税込みです
        </p>
      </div>
    </section>
  );
}
