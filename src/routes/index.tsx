import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-sushi.jpg";
import dishAburi from "@/assets/dish-aburi.jpg";
import dishRamen from "@/assets/dish-ramen.jpg";
import dishKaraage from "@/assets/dish-karaage.jpg";
import dishGyoza from "@/assets/dish-gyoza.jpg";
import dishRolls from "@/assets/dish-rolls.jpg";
import dishSashimi from "@/assets/dish-sashimi.jpg";
import galleryChef from "@/assets/gallery-chef.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Sushi Honke",
          servesCuisine: ["Japanese", "Sushi", "Sashimi", "Ramen"],
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Calamvale Central, 662 Compton Rd",
            addressLocality: "Calamvale",
            addressRegion: "QLD",
            addressCountry: "AU",
          },
          acceptsReservations: true,
        }),
      },
    ],
  }),
});

const NAV = [
  { label: "Menu", href: "#menu" },
  { label: "Featured", href: "#featured" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

const MENU_CATEGORIES = [
  "Signature",
  "Sashimi",
  "Nigiri",
  "Rolls",
  "Ramen",
  "Rice Bowls",
  "Sides",
];

type MenuItem = {
  name: string;
  desc: string;
  price: string;
  category: string;
  image?: string;
  tag?: "Popular" | "Chef's Pick";
};

const MENU: MenuItem[] = [
  { name: "Aburi Salmon Nigiri", desc: "Torched salmon, yuzu kosho, sesame.", price: "$12.80", category: "Signature", image: dishAburi, tag: "Chef's Pick" },
  { name: "Salmon Sashimi", desc: "Six slices of premium salmon, ice bed.", price: "$18.50", category: "Sashimi", image: dishSashimi, tag: "Popular" },
  { name: "Mixed Sashimi Platter", desc: "Tuna, salmon, kingfish — chef's selection.", price: "$32.00", category: "Sashimi" },
  { name: "Salmon Nigiri (2pc)", desc: "Hand-pressed sushi rice, fresh salmon.", price: "$7.20", category: "Nigiri" },
  { name: "Tuna Nigiri (2pc)", desc: "Sustainably sourced yellowfin tuna.", price: "$8.40", category: "Nigiri" },
  { name: "Dragon Roll", desc: "Prawn tempura, avocado, eel glaze.", price: "$18.00", category: "Rolls", image: dishRolls, tag: "Popular" },
  { name: "Rainbow Roll", desc: "California roll topped with assorted sashimi.", price: "$19.50", category: "Rolls" },
  { name: "Tonkotsu Ramen", desc: "12hr pork bone broth, chashu, ajitama egg.", price: "$19.90", category: "Ramen", image: dishRamen, tag: "Chef's Pick" },
  { name: "Spicy Miso Ramen", desc: "Rich miso, chilli oil, corn, scallion.", price: "$20.50", category: "Ramen" },
  { name: "Chicken Karaage Don", desc: "Crispy karaage over rice, kewpie, scallion.", price: "$16.80", category: "Rice Bowls", image: dishKaraage, tag: "Popular" },
  { name: "Chicken Katsu Don", desc: "Panko chicken, egg, dashi, steamed rice.", price: "$17.50", category: "Rice Bowls" },
  { name: "Teriyaki Beef Bowl", desc: "Grilled beef, teriyaki glaze, sesame.", price: "$19.80", category: "Rice Bowls" },
  { name: "Pork Gyoza (6pc)", desc: "Pan-fried dumplings, house dipping sauce.", price: "$10.50", category: "Sides", image: dishGyoza },
  { name: "Ebi Fry", desc: "Panko prawns, tonkatsu sauce.", price: "$12.00", category: "Sides" },
  { name: "Edamame", desc: "Steamed soybeans, sea salt.", price: "$6.50", category: "Sides" },
];

const REVIEWS = [
  {
    text: "The freshest sushi in Brisbane south. Aburi salmon is unreal — worth the drive every single time.",
    name: "Emily R.",
    source: "Google Review",
  },
  {
    text: "A neighbourhood gem. Sushi train keeps the kids busy while we enjoy sashimi and ramen. Consistently excellent.",
    name: "Daniel K.",
    source: "Google Review",
  },
  {
    text: "Beautiful presentation, warm service, and the tonkotsu ramen is deeply comforting. Our new local.",
    name: "Priya S.",
    source: "Google Review",
  },
  {
    text: "Fresh, generous portions, and priced fairly. Easy takeaway too. Highly recommend.",
    name: "Marcus T.",
    source: "Google Review",
  },
];

const GALLERY = [
  { src: dishSashimi, alt: "Fresh sashimi platter" },
  { src: galleryChef, alt: "Chef preparing nigiri" },
  { src: dishRolls, alt: "Signature sushi rolls" },
  { src: galleryInterior, alt: "Restaurant interior" },
  { src: dishAburi, alt: "Aburi salmon nigiri" },
  { src: dishRamen, alt: "Tonkotsu ramen" },
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

function Index() {
  const [activeCat, setActiveCat] = useState("Signature");
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = MENU.filter((m) => m.category === activeCat);

  return (
    <div className="seigaiha-bg relative min-h-screen overflow-x-hidden text-foreground">
      {/* scroll progress */}
      <div
        className="fixed left-0 top-0 z-[60] h-[2px] bg-primary transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
        aria-hidden
      />

      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <a href="#top" className="flex items-center gap-2">
            <span className="font-display text-2xl font-semibold tracking-tight">
              Sushi <span className="text-primary">Honke</span>
            </span>
          </a>
          <ul className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="story-link text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden md:block">
            <a
              href="#order"
              className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
            >
              Order Online
            </a>
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
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setNavOpen(false)}
                    className="block py-2 text-base uppercase tracking-widest text-muted-foreground"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#order"
                  onClick={() => setNavOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
                >
                  Order Online
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-[100svh] w-full">
        <img
          src={heroImg}
          alt="Fresh salmon sashimi and nigiri at Sushi Honke"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="absolute inset-0 flex items-end pb-20 pt-32 sm:items-center sm:pb-0">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl">
              <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-border/70 bg-background/40 px-4 py-1.5 text-xs uppercase tracking-[0.28em] text-muted-foreground backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Calamvale Central · Brisbane
              </p>
              <h1 className="font-display text-5xl font-light leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                Fresh Japanese
                <br />
                dining in{" "}
                <span className="italic text-primary">Calamvale</span>.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Premium sushi, sashimi, ramen and Japanese favourites — served
                fresh every day in a modern sushi train setting.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#order"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:scale-[1.03]"
                >
                  Order Online
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/30 px-7 py-4 text-sm font-medium uppercase tracking-widest text-foreground backdrop-blur-md transition-colors hover:bg-background/60"
                >
                  View Menu
                </a>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {["Fresh Daily", "Dine In", "Takeaway", "Sushi Train"].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="text-primary">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* vertical JP mark */}
        <div
          className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-muted-foreground lg:flex"
          aria-hidden
        >
          <span>Since</span>
          <span className="font-display text-lg text-foreground">寿司</span>
          <span className="h-16 w-px bg-border" />
        </div>
      </section>

      {/* WHY US */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">
                — Our Promise
              </p>
              <h2 className="max-w-2xl font-display text-4xl font-light leading-tight sm:text-5xl">
                Crafted with care.
                <br />
                Served with pride.
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Every plate begins with quality ingredients, traditional
              technique, and a warm welcome from our team.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Fresh Ingredients", d: "Sourced daily and prepared in-house by our chefs.", i: "◈" },
              { t: "Premium Seafood", d: "Sashimi-grade salmon, tuna and kingfish.", i: "◉" },
              { t: "Authentic Flavours", d: "Traditional Japanese recipes with a modern touch.", i: "❋" },
              { t: "Local & Friendly", d: "A relaxed neighbourhood spot for every occasion.", i: "✦" },
            ].map((f) => (
              <div key={f.t} className="group relative bg-card p-10 transition-colors hover:bg-secondary">
                <div className="mb-8 text-3xl text-primary">{f.i}</div>
                <h3 className="font-display text-2xl font-normal">{f.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">— The Menu</p>
            <h2 className="font-display text-4xl font-light sm:text-5xl md:text-6xl">
              A taste of Japan, made fresh.
            </h2>
          </div>

          {/* filters */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {MENU_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`rounded-full border px-5 py-2 text-xs uppercase tracking-widest transition-all ${
                  activeCat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m) => (
              <article
                key={m.name}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/50"
              >
                {m.image && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                    />
                    {m.tag && (
                      <span className="absolute left-4 top-4 rounded-full bg-primary/95 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-primary-foreground backdrop-blur-md">
                        {m.tag}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-start justify-between gap-4 p-6">
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-medium">{m.name}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                  <span className="shrink-0 font-display text-lg text-primary">{m.price}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="#order"
              className="inline-flex items-center gap-2 border-b border-primary pb-1 text-sm uppercase tracking-[0.28em] text-primary transition-all hover:gap-3"
            >
              Order the full menu <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED — magazine strip */}
      <section id="featured" className="relative bg-card py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <h2 className="font-display text-4xl font-light leading-tight sm:text-5xl">
              Chef's <span className="italic text-primary">recommendations</span>.
            </h2>
            <p className="max-w-sm text-muted-foreground">
              Signature dishes our regulars come back for — and first-timers
              never forget.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
            <FeatureCard className="md:col-span-4" img={dishAburi} title="Aburi Salmon" sub="Torched · Yuzu Kosho" />
            <FeatureCard className="md:col-span-2" img={dishGyoza} title="Pork Gyoza" sub="Pan-fried · House sauce" />
            <FeatureCard className="md:col-span-2" img={dishRamen} title="Tonkotsu Ramen" sub="12hr broth · Ajitama" />
            <FeatureCard className="md:col-span-4" img={dishKaraage} title="Karaage Don" sub="Crispy · Kewpie · Scallion" />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={galleryInterior}
                alt="Sushi Honke interior"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden max-w-[240px] rounded-2xl border border-border bg-background p-6 shadow-[var(--shadow-elegant)] lg:block">
              <p className="font-display text-3xl text-primary">15+</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Years serving Brisbane's south with fresh Japanese cuisine.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">— About Us</p>
            <h2 className="font-display text-4xl font-light leading-tight sm:text-5xl">
              A neighbourhood
              <br />
              sushi destination.
            </h2>
            <p className="mt-6 text-muted-foreground">
              Tucked inside Calamvale Central, Sushi Honke brings a warm,
              modern take on traditional Japanese dining. Watch our chefs work
              behind the sushi bar, pick your favourites from the sushi train,
              or settle in for a bowl of steaming ramen.
            </p>
            <p className="mt-4 text-muted-foreground">
              Whether it's a quick weekday lunch, a family dinner or a date
              night, we've built a space that feels equal parts refined and
              relaxed — with food that lets the ingredients speak.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-4 text-sm">
              {["Families", "Date nights", "Lunch", "Dinner", "Friends", "Local community"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-1 w-4 bg-primary" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">— Gallery</p>
              <h2 className="font-display text-4xl font-light sm:text-5xl">
                Moments from the restaurant.
              </h2>
            </div>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="text-sm uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-primary"
            >
              Follow on Instagram →
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {GALLERY.map((g, i) => (
              <div
                key={g.alt}
                className={`group relative overflow-hidden rounded-2xl ${
                  i === 0 || i === 3 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"
                }`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="relative bg-card py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">— Reviews</p>
            <h2 className="font-display text-4xl font-light sm:text-5xl">
              Loved by locals.
            </h2>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="text-gold" style={{ color: "var(--gold)" }}>
                ★★★★★
              </span>
              <span>Rated by hundreds on Google</span>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((r) => (
              <figure
                key={r.name}
                className="flex h-full flex-col justify-between rounded-2xl border border-border bg-background p-8"
              >
                <div>
                  <div className="mb-4 text-primary">★★★★★</div>
                  <blockquote className="text-sm leading-relaxed text-foreground">
                    "{r.text}"
                  </blockquote>
                </div>
                <figcaption className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
                  {r.name} · {r.source}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER / VISIT */}
      <section id="order" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div id="visit" className="rounded-3xl border border-border bg-card p-8 sm:p-12">
              <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">— Visit</p>
              <h3 className="font-display text-3xl font-light sm:text-4xl">
                Calamvale Central
              </h3>
              <p className="mt-3 text-muted-foreground">
                662 Compton Road, Calamvale QLD 4116
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="Sushi Honke on Google Maps"
                  src="https://www.google.com/maps?q=Calamvale%20Central%20Shopping%20Centre%20662%20Compton%20Road%20Calamvale&output=embed"
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <dl className="mt-8 grid grid-cols-2 gap-6 text-sm">
                <div>
                  <dt className="text-muted-foreground">Hours</dt>
                  <dd className="mt-1">Mon–Sun · 11:00 – 21:00</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd className="mt-1">
                    <a href="tel:+61" className="hover:text-primary">
                      (07) 3000 0000
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Parking</dt>
                  <dd className="mt-1">Free onsite parking</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Dining</dt>
                  <dd className="mt-1">Dine-in · Takeaway</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://maps.google.com/?q=Sushi+Honke+Calamvale"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-5 py-2.5 text-sm uppercase tracking-widest transition-colors hover:border-foreground"
                >
                  Get directions
                </a>
                <a
                  href="tel:+61"
                  className="rounded-full border border-border px-5 py-2.5 text-sm uppercase tracking-widest transition-colors hover:border-foreground"
                >
                  Call us
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={dishSashimi}
                alt="Fresh sashimi"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/60 to-background/90" />
              <div className="relative flex h-full flex-col justify-between p-8 sm:p-12">
                <div>
                  <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">— Order Online</p>
                  <h3 className="font-display text-4xl font-light leading-tight sm:text-5xl">
                    Fresh sushi,
                    <br />
                    <span className="italic text-primary">delivered</span> or ready to collect.
                  </h3>
                  <p className="mt-4 max-w-md text-muted-foreground">
                    Skip the queue. Order takeaway online or through your
                    favourite delivery partner.
                  </p>
                </div>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#"
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
                  >
                    Order Takeaway
                  </a>
                  <a
                    href="https://www.ubereats.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center rounded-full border border-border bg-background/40 px-6 py-4 text-sm font-medium uppercase tracking-widest backdrop-blur-md transition-colors hover:bg-background/70"
                  >
                    Uber Eats
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">— FAQ</p>
            <h2 className="font-display text-4xl font-light sm:text-5xl">
              Good to know.
            </h2>
          </div>
          <div className="divide-y divide-border rounded-2xl border border-border bg-card">
            {[
              { q: "Do you take bookings?", a: "Walk-ins are welcome. For larger groups, please call us ahead to reserve seating." },
              { q: "Is takeaway available?", a: "Yes — order in-store, over the phone, or through our online partners." },
              { q: "Do you cater for dietary needs?", a: "We have vegetarian and gluten-friendly options. Please let our staff know about any allergies." },
              { q: "Where is parking?", a: "Free parking is available at Calamvale Central Shopping Centre." },
            ].map((f) => (
              <details key={f.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer items-center justify-between text-base font-medium">
                  {f.q}
                  <span className="text-primary transition-transform group-open:rotate-45">＋</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <p className="font-display text-3xl">
                Sushi <span className="text-primary">Honke</span>
              </p>
              <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                Fresh Japanese dining at Calamvale Central. Sushi, sashimi,
                ramen and more — served daily.
              </p>
            </div>
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-muted-foreground">Explore</p>
              <ul className="space-y-2 text-sm">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="hover:text-primary">{n.label}</a>
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

      {/* mobile floating order */}
      <a
        href="#order"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-glow)] md:hidden"
      >
        Order Now →
      </a>
    </div>
  );
}

function FeatureCard({
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
