import { MARQUEE_ITEMS } from '@/lib/site-data'

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden border-y border-line bg-bg-1">
      <div
        className="flex animate-marquee items-center gap-8 py-4 hover:[animation-play-state:paused]"
        style={{ '--marquee-duration': '32s' } as React.CSSProperties}
      >
        {Array.from({ length: 2 }).flatMap((_, iteration) =>
          MARQUEE_ITEMS.map((item, index) => (
            <div
              key={`${iteration}-${index}`}
              className="flex items-center gap-4 shrink-0 whitespace-nowrap"
            >
              <span className="font-mono text-sm uppercase tracking-widest text-ink-dim">
                {item}
              </span>
              {index < MARQUEE_ITEMS.length - 1 && (
                <span className="text-accent">/</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
