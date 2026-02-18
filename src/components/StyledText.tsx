import React from "react";

interface Props {
  text: string;
  charSizes?: number[];
  defaultSize?: number;
  className?: string;
}

export default function StyledText({
  text,
  charSizes,
  defaultSize = 16,
  className,
}: Props) {
  if (!charSizes || charSizes.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const chars = Array.from(text);

  return (
    <span className={className}>
      {chars.map((char, i) => {
        if (char === "\n") {
          return <br key={i} />;
        }
        const size = charSizes[i] ?? defaultSize;
        return (
          <span key={i} style={{ fontSize: `${size}px` }}>
            {char}
          </span>
        );
      })}
    </span>
  );
}
