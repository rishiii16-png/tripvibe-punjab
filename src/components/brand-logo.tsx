type Props = { className?: string };

/** Animated RideVibe wordmark: speed-line mark + shimmering type. */
export function BrandLogo({ className = "" }: Props) {
  return (
    <span className={`group/logo flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center">
        {/* orbiting ring */}
        <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full">
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="currentColor"
            className="text-primary/25"
            strokeWidth="1.5"
          />
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="currentColor"
            className="text-primary logo-orbit"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="26 87"
          />
        </svg>
        {/* mark */}
        <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-[0.55rem] bg-[image:var(--gradient-ember,linear-gradient(135deg,var(--primary),color-mix(in_oklab,var(--primary)_55%,black)))] text-primary-foreground shadow-[0_0_18px_-4px_color-mix(in_oklab,var(--primary)_80%,transparent)]">
          <span className="font-display text-lg leading-none pt-0.5">R</span>
          <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-primary-foreground/30 logo-sheen" />
        </span>
      </span>

      <span className="relative font-display text-2xl tracking-wide">
        <span className="logo-shimmer bg-[linear-gradient(100deg,var(--foreground)_0%,var(--foreground)_40%,var(--primary)_50%,var(--foreground)_60%,var(--foreground)_100%)] bg-clip-text text-transparent">
          Ride
        </span>
        <span className="text-primary">Vibe</span>
        {/* speed lines on hover */}
        <span className="pointer-events-none absolute -left-4 top-1/2 h-px w-3 -translate-y-2 bg-primary/70 opacity-0 transition-all duration-300 group-hover/logo:-translate-x-1 group-hover/logo:opacity-100" />
        <span className="pointer-events-none absolute -left-5 top-1/2 h-px w-4 translate-y-1 bg-primary/50 opacity-0 transition-all delay-75 duration-300 group-hover/logo:-translate-x-1.5 group-hover/logo:opacity-100" />
        <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover/logo:scale-x-100" />
      </span>
    </span>
  );
}
