import { motion } from "framer-motion";

interface AmsterdamTrustBadgeProps {
  onClick: () => void;
  size?: "sm" | "md" | "lg";
}

const AmsterdamTrustBadge = ({ onClick, size = "md" }: AmsterdamTrustBadgeProps) => {
  const sizeMap = { sm: 56, md: 80, lg: 120 };
  const s = sizeMap[size];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="relative group cursor-pointer focus:outline-none"
      aria-label="Amsterdam AI Trust Badge — click for details"
    >
      <svg width={s} height={s} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer ring */}
        <circle cx="60" cy="60" r="58" stroke="hsl(220,55%,18%)" strokeWidth="3" fill="hsl(0,0%,100%)" />
        <circle cx="60" cy="60" r="52" stroke="hsl(356,78%,51%)" strokeWidth="1.5" fill="none" />

        {/* Three Amsterdam crosses (XXX) */}
        <g transform="translate(60,28)">
          <AmsterdamCross />
        </g>
        <g transform="translate(40,48)">
          <AmsterdamCross />
        </g>
        <g transform="translate(80,48)">
          <AmsterdamCross />
        </g>

        {/* Shield / check */}
        <path
          d="M60 62 L60 78"
          stroke="hsl(220,55%,18%)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M48 72 C48 72 54 88 60 92 C66 88 72 72 72 72 L60 66 Z"
          fill="hsl(220,55%,18%)"
          opacity="0.9"
        />
        <polyline
          points="54,79 59,84 67,74"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Circular text */}
        <defs>
          <path id="topArc" d="M 20,60 a 40,40 0 1,1 80,0" />
          <path id="bottomArc" d="M 100,60 a 40,40 0 1,1 -80,0" />
        </defs>
        <text fontSize="7.5" fontFamily="'Space Grotesk', sans-serif" fontWeight="600" fill="hsl(220,55%,18%)" letterSpacing="2">
          <textPath href="#topArc" startOffset="50%" textAnchor="middle">
            AMSTERDAM AI
          </textPath>
        </text>
        <text fontSize="6.5" fontFamily="'Space Grotesk', sans-serif" fontWeight="500" fill="hsl(356,78%,51%)" letterSpacing="1.5">
          <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
            VERIFIED ✦ TRUSTED
          </textPath>
        </text>
      </svg>

      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: '0 0 24px 4px hsla(356,78%,51%,0.2), 0 0 48px 8px hsla(220,55%,18%,0.1)'
        }}
      />
    </motion.button>
  );
};

const AmsterdamCross = () => (
  <g>
    <rect x="-3" y="-8" width="6" height="16" rx="1" fill="hsl(356,78%,51%)" />
    <rect x="-7" y="-4" width="14" height="5" rx="1" fill="hsl(356,78%,51%)" />
  </g>
);

export default AmsterdamTrustBadge;
