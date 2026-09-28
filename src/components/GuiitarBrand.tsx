import { type SVGProps, type ImgHTMLAttributes } from "react";

export function GuiitarLogo({
  className = "h-10 w-auto",
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
        objectFit: "contain",
        display: "inline-block",
        ...style,
      }}
      {...props}
    />
  );
}

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

export function GuiitarFullLogo({ className = "h-11 w-auto", style, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 310 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "block", height: "44px", width: "auto", minWidth: "175px", ...style }}
      {...props}
    >
      {/* Hexagon icon */}
      <g transform="translate(4, 3)">
        {/* Outer Hexagon Frame */}
        <path
          d="M24 6 L58 6 L75 35 L58 64 L24 64 L7 35 Z"
          fill="none"
          stroke="#E25822"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        {/* Top Green Accent */}
        <path d="M24 14 L58 14 L48 26 L34 26 Z" fill="#65A30D" />
        {/* Yellow Liquid Base */}
        <path d="M20 35 L34 26 L48 26 L62 35 L54 56 L28 56 Z" fill="#EAB308" />
        {/* Bubbles */}
        <circle cx="34" cy="31" r="1.8" fill="#CA8A04" />
        <circle cx="41" cy="28" r="1.4" fill="#CA8A04" />
        <circle cx="47" cy="33" r="2" fill="#CA8A04" />
        {/* Orange right wing */}
        <path d="M42 35 L68 35 L68 56 L42 56 Z" fill="#E25822" />
      </g>

      {/* Vertical Divider */}
      <line
        x1="92"
        y1="10"
        x2="92"
        y2="62"
        stroke="#94A3B8"
        strokeWidth="2"
      />

      {/* Text: GUIITAR */}
      <text
        x="106"
        y="35"
        fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="30"
        fontWeight="800"
        fill="#1E3A8A"
        letterSpacing="0.04em"
      >
        GUIITAR
      </text>

      {/* Text: COUNCIL */}
      <text
        x="107"
        y="58"
        fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="19"
        fontWeight="800"
        fill="#334155"
        letterSpacing="0.22em"
      >
        COUNCIL
      </text>
    </svg>
  );
}

export function StickyBackgroundWatermark() {
  return null;
}


