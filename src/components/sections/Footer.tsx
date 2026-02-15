import { FooterData } from "@/lib/types";

interface Props {
  data: FooterData;
}

export default function Footer({ data }: Props) {
  return (
    <footer className="bg-lapupu-navy-dark py-10 px-6 text-center">
      <div className="mb-4">
        <span className="text-white/40 tracking-[0.5em] text-xs uppercase">
          Lapupu
        </span>
      </div>
      <div className="h-px w-8 bg-lapupu-gold/30 mx-auto mb-4" />
      <p className="text-white/30 text-xs tracking-wider">{data.copyright}</p>
    </footer>
  );
}
