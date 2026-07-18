import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Home", to: "/" as const },
  { label: "Menu", to: "/menu" as const },
  { label: "About", to: "/about" as const },
  { label: "Visit", to: "/contact" as const },
];

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setP(Math.min(1, Math.max(0, scrolled)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

export function SiteHeader() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useScrollProgress();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return router.subscribe("onResolved", () => setNavOpen(false));
  }, [router]);

  return (
    <>
      <div
        className="fixed left-0 top-0 z-[60] h-[2px] bg-primary transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
        aria-hidden
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-semibold tracking-tight">
              Sushi <span className="text-primary">Honke</span>
            </span>
          </Link>
          <ul className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "text-foreground" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  className="story-link text-sm uppercase tracking-widest transition-colors hover:text-foreground"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
            >
              Order Online
            </Link>
          </div>
          <button
            onClick={() => setNavOpen((s) => !s)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
          >
            <span className="text-lg">{navOpen ? "✕" : "☰"}</span>
          </button>
        </nav>
        {navOpen && (
          <div className="animate-fade-in border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    onClick={() => setNavOpen(false)}
                    className="block py-2 text-base uppercase tracking-widest text-muted-foreground"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/contact"
                  onClick={() => setNavOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
                >
                  Order Online
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-3xl">
              Sushi <span className="text-primary">Honke</span>
            </p>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Fresh Japanese dining at Calamvale Central. Sushi, sashimi, ramen
              and more — served daily.
            </p>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-muted-foreground">Explore</p>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-primary">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-muted-foreground">Connect</p>
            <ul className="space-y-2 text-sm">
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-primary">Facebook</a></li>
              <li><a href="tel:+61" className="hover:text-primary">(07) 3000 0000</a></li>
              <li className="text-muted-foreground">Calamvale Central, QLD</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Sushi Honke. All rights reserved.</p>
          <p>Made fresh in Brisbane · Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}

export function FloatingOrder() {
  return (
    <Link
      to="/contact"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-glow)] md:hidden"
    >
      Order Now →
    </Link>
  );
}

export function FeatureCard({
  img,
  title,
  sub,
  className = "",
}: {
  img: string;
  title: string;
  sub: string;
  className?: string;
}) {
  return (
    <div className={`group relative aspect-[4/3] overflow-hidden rounded-2xl ${className}`}>
      <img
        src={img}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-primary">{sub}</p>
        <h3 className="mt-2 font-display text-2xl font-normal sm:text-3xl">{title}</h3>
      </div>
    </div>
  );
}