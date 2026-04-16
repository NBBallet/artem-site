export default function Tryzub({ className = "", color = "#C8102E" }: { className?: string; color?: string }) {
  return (
    <svg
      width="200"
      height="267"
      viewBox="0 0 120 160"
      fill="none"
      className={className}
    >
      <path
        d="M60 6 L60 110"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M60 6 L68 18 L60 30 L52 18 Z" fill={color} />
      <path
        d="M22 32 C22 32 18 50 22 68 C26 86 38 96 48 108 L52 112"
        stroke={color}
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M12 36 C16 28 26 26 30 34"
        stroke={color}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="12" cy="38" r="4" fill={color} />
      <path
        d="M98 32 C98 32 102 50 98 68 C94 86 82 96 72 108 L68 112"
        stroke={color}
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M108 36 C104 28 94 26 90 34"
        stroke={color}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="108" cy="38" r="4" fill={color} />
      <path
        d="M28 138 Q60 152 92 138"
        stroke={color}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M38 118 L28 138"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M82 118 L92 138"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M60 112 L60 138"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle
        cx="60"
        cy="72"
        r="5"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
      />
    </svg>
  );
}
