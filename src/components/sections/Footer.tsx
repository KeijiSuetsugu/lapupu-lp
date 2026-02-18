import { FooterData } from "@/lib/types";
import StyledText from "@/components/StyledText";

interface Props {
  data: FooterData;
  charStyles?: Record<string, number[]>;
}

export default function Footer({ data, charStyles = {} }: Props) {
  return (
    <footer className="bg-lapupu-navy-dark py-10 px-6 text-center">
      <div className="mb-4">
        <span className="text-white/40 tracking-[0.5em] text-xs uppercase">
          Lapupu
        </span>
      </div>
      <div className="h-px w-8 bg-lapupu-gold/30 mx-auto mb-4" />
      <p className="text-white/30 tracking-wider">
        <StyledText
          text={data.copyright}
          charSizes={charStyles["footer.copyright"]}
          defaultSize={12}
        />
      </p>
    </footer>
  );
}
