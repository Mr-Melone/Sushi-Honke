import { useEffect, useRef } from "react";

export type TrainDish = {
  img: string;
  title: string;
  sub: string;
};

export function SushiTrain({ dishes }: { dishes: TrainDish[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const pausedRef = useRef(false);

  // Duplicate list for seamless loop
  const items = [...dishes, ...dishes];

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const measure = () => {
      halfWidthRef.current = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const SPEED = 60; // px per second
    const HOVER_SPEED = 10; // slow drift on hover
    let last = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (halfWidthRef.current > 0) {
        const speed = pausedRef.current ? HOVER_SPEED : SPEED;
        offsetRef.current -= speed * dt;
        if (offsetRef.current <= -halfWidthRef.current) {
          offsetRef.current += halfWidthRef.current;
        }
      }
      track.style.transform = `translate3d(${offsetRef.current}px,0,0)`;

      // Scale each card based on distance from container center
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const maxDist = rect.width / 2;
      const cards = track.children;
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        const cr = card.getBoundingClientRect();
        const cx = cr.left + cr.width / 2;
        const dist = Math.min(Math.abs(cx - centerX), maxDist);
        const t = 1 - dist / maxDist; // 1 at center, 0 at edges
        const scale = 0.78 + t * 0.32; // 0.78 -> 1.10
        const opacity = 0.55 + t * 0.45;
        card.style.transform = `scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(Math.round(t * 100));
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnter = () => (pausedRef.current = true);
    const onLeave = () => {
      pausedRef.current = false;
      last = performance.now();
    };
    container.addEventListener("pointerenter", onEnter);
    container.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointerenter", onEnter);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, [dishes.length]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-10"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div
        ref={trackRef}
        className="flex items-center gap-6 will-change-transform"
        style={{ width: "max-content" }}
      >
        {items.map((d, i) => (
          <div
            key={`${d.title}-${i}`}
            className="relative w-[260px] shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-elegant)] transition-[opacity] duration-200 sm:w-[320px] md:w-[360px]"
            style={{ transformOrigin: "center center" }}
          >
            <div className="aspect-[4/5] w-full overflow-hidden">
              <img
                src={d.img}
                alt={d.title}
                loading="lazy"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-5">
              <p className="text-[10px] uppercase tracking-[0.32em] text-primary">
                {d.sub}
              </p>
              <h3 className="mt-1 font-display text-2xl font-normal">
                {d.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}