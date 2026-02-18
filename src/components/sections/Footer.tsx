import { FooterData } from "@/lib/types";
import StyledText from "@/components/StyledText";

interface Props {
  data: FooterData;
  charStyles?: Record<string, number[]>;
}

export default function Footer({ data, charStyles = {} }: Props) {
  return (
    <footer className="bg-white py-10 px-6 text-center border-t border-lapupu-brown/10">
      <div className="mb-4">
        <span className="text-lapupu-brown/40 tracking-[0.5em] text-xs uppercase">
          Lapupu
        </span>
      </div>
      <div className="h-px w-8 bg-lapupu-green/30 mx-auto mb-4" />
      <p className="text-lapupu-brown/30 tracking-wider">
        <StyledText
          text={data.copyright}
          charSizes={charStyles["footer.copyright"]}
          defaultSize={12}
        />
      </p>
    </footer>
  );
}
