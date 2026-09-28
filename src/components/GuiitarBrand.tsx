import { type SVGProps, type ImgHTMLAttributes } from "react";

export function GuiitarEmblem({ className = "w-10 h-10", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Outer Hexagon frame - Orange / Coral */}
      <path
        d="M28 15 L72 15 L92 50 L72 85 L28 85 L8 50 Z"
        fill="none"
        stroke="#EA580C"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      {/* Green layer */}
      <path d="M26 23 L74 23 L62 38 L38 38 L26 23 Z" fill="#65A30D" />
      {/* Yellow Beaker / Liquid Fill */}
      <path d="M22 50 L38 38 L62 38 L78 50 L68 76 L32 76 Z" fill="#EAB308" />
      {/* Liquid Bubbles */}
      <circle cx="38" cy="44" r="2" fill="#CA8A04" />
      <circle cx="45" cy="40" r="1.5" fill="#CA8A04" />
      <circle cx="50" cy="45" r="2.5" fill="#CA8A04" />
      <circle cx="58" cy="42" r="1.5" fill="#CA8A04" />
      <circle cx="42" cy="48" r="1.8" fill="#CA8A04" />
      {/* G Shape inner cut & orange corner */}
      <path d="M50 50 L84 50 L84 76 L50 76 Z" fill="#EA580C" />
      <path d="M52 52 L78 52 L68 70 L52 70 Z" fill="#F97316" />
    </svg>
  );
}

export function GuiitarLogo({
  className = "site-logo-img",
  alt = "GUIITAR Council",
  style,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/guiitar-council-logo.png"
      alt={alt}
      className={className}
      style={{
        height: "44px",
        width: "auto",
        objectFit: "contain",
        display: "block",
        ...style,
      }}
      {...props}
    />
  );
}

export function GuiitarFullLogo({
  className = "site-logo-img",
  alt = "GUIITAR Council",
  style,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/guiitar-council-logo.png"
      alt={alt}
      className={className}
      style={{
        height: "44px",
        width: "auto",
        objectFit: "contain",
        display: "block",
        ...style,
      }}
      {...props}
    />
  );
}

export function StickyBackgroundWatermark() {
  return null;
}


