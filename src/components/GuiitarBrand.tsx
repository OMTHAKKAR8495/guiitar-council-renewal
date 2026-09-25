import { type SVGProps } from 'react';

export function GuiitarEmblem({ className = 'w-10 h-10', ...props }: SVGProps<SVGSVGElement>) {
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
      <path
        d="M26 23 L74 23 L62 38 L38 38 L26 23 Z"
        fill="#65A30D"
      />
      {/* Yellow Beaker / Liquid Fill */}
      <path
        d="M22 50 L38 38 L62 38 L78 50 L68 76 L32 76 Z"
        fill="#EAB308"
      />
      {/* Liquid Bubbles */}
      <circle cx="38" cy="44" r="2" fill="#CA8A04" />
      <circle cx="45" cy="40" r="1.5" fill="#CA8A04" />
      <circle cx="50" cy="45" r="2.5" fill="#CA8A04" />
      <circle cx="58" cy="42" r="1.5" fill="#CA8A04" />
      <circle cx="42" cy="48" r="1.8" fill="#CA8A04" />
      {/* G Shape inner cut & orange corner */}
      <path
        d="M50 50 L84 50 L84 76 L50 76 Z"
        fill="#EA580C"
      />
      <path
        d="M52 52 L78 52 L68 70 L52 70 Z"
        fill="#F97316"
      />
    </svg>
  );
}

export function GuiitarFullLogo({ className = 'h-12', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Hexagon icon */}
      <g transform="translate(0, 0)">
        {/* Outer Hexagon Frame */}
        <path
          d="M24 10 L60 10 L78 40 L60 70 L24 70 L6 40 Z"
          fill="none"
          stroke="#EA580C"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        {/* Top Green Accent */}
        <path
          d="M23 18 L61 18 L51 30 L33 30 Z"
          fill="#65A30D"
        />
        {/* Yellow Liquid Base */}
        <path
          d="M20 40 L33 30 L51 30 L64 40 L56 62 L28 62 Z"
          fill="#EAB308"
        />
        {/* Bubbles */}
        <circle cx="34" cy="35" r="1.8" fill="#CA8A04" />
        <circle cx="40" cy="32" r="1.3" fill="#CA8A04" />
        <circle cx="46" cy="36" r="2" fill="#CA8A04" />
        {/* Orange right wing */}
        <path
          d="M44 40 L70 40 L70 62 L44 62 Z"
          fill="#EA580C"
        />
      </g>

      {/* Divider */}
      <line x1="90" y1="12" x2="90" y2="68" stroke="currentColor" strokeWidth="2" className="text-slate-300 dark:text-slate-700" />

      {/* Text: GUIITAR */}
      <text
        x="104"
        y="38"
        fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
        fontSize="32"
        fontWeight="800"
        className="fill-[#1E3A8A] dark:fill-[#60A5FA]"
        letterSpacing="0.04em"
      >
        GUIITAR
      </text>

      {/* Text: COUNCIL */}
      <text
        x="105"
        y="62"
        fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
        fontSize="21"
        fontWeight="800"
        className="fill-[#334155] dark:fill-[#E2E8F0]"
        letterSpacing="0.22em"
      >
        COUNCIL
      </text>
    </svg>
  );
}

export function StickyBackgroundWatermark() {
  return (
    <div
      className="page-background-watermark"
      aria-hidden="true"
    >
      <img
        src="/guiitar-council-logo.png"
        alt=""
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
