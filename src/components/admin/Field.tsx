interface Props {
  label: string;
  children: React.ReactNode;
}

export default function Field({ label, children }: Props) {
  return (
    <div>
      <label className="block text-xs text-gray-500 tracking-wider mb-1.5 uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}
