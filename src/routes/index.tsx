import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-sushi.jpg";
import dishAburi from "@/assets/dish-aburi.jpg";
import dishRamen from "@/assets/dish-ramen.jpg";
import dishKaraage from "@/assets/dish-karaage.jpg";
import dishGyoza from "@/assets/dish-gyoza.jpg";
import dishSashimi from "@/assets/dish-sashimi.jpg";
import dishRolls from "@/assets/dish-rolls.jpg";
import { SushiTrain } from "@/components/sushi-train";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Sushi Honke — Fresh Japanese Dining in Calamvale" },
      {
        name: "description",
        content:
          "Premium sushi, sashimi, ramen and Japanese favourites at Sushi Honke — a modern sushi train experience at Calamvale Central, Brisbane.",
      },
      { property: "og:title", content: "Sushi Honke — Fresh Japanese Dining in Calamvale" },
      { property: "og:description", content: "Premium sushi, sashimi, ramen and Japanese favourites at Sushi Honke — a modern sushi train experience at Calamvale Central, Brisbane." },
    ],
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

function Home() {
  return (
    <>
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
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden />
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
                dining in <span className="italic text-primary">Calamvale</span>.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Premium sushi, sashimi, ramen and Japanese favourites — served
                fresh every day in a modern sushi train setting.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-glow)] transition-all hover:scale-[1.03]"
                >
                  Order Online
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/30 px-7 py-4 text-sm font-medium uppercase tracking-widest text-foreground backdrop-blur-md transition-colors hover:bg-background/60"
                >
                  View Menu
                </Link>
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
        <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-muted-foreground lg:flex" aria-hidden>
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
              <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">— Our Promise</p>
              <h2 className="max-w-2xl font-display text-4xl font-light leading-tight sm:text-5xl">
                Crafted with care.
                <br />
                Served with pride.
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Every plate begins with quality ingredients, traditional technique, and a warm welcome from our team.
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

      {/* FEATURED */}
      <section className="relative bg-card py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <h2 className="font-display text-4xl font-light leading-tight sm:text-5xl">
              Chef's <span className="italic text-primary">recommendations</span>.
            </h2>
            <p className="max-w-sm text-muted-foreground">
              Signature dishes gliding past — just like our sushi train.
            </p>
          </div>
        </div>
        <SushiTrain
          dishes={[
            { img: dishAburi, title: "Aburi Salmon", sub: "Torched · Yuzu Kosho" },
            { img: dishGyoza, title: "Pork Gyoza", sub: "Pan-fried · House sauce" },
            { img: dishRamen, title: "Tonkotsu Ramen", sub: "12hr broth · Ajitama" },
            { img: dishKaraage, title: "Karaage Don", sub: "Crispy · Kewpie · Scallion" },
            { img: dishSashimi, title: "Sashimi Platter", sub: "Salmon · Tuna · Kingfish" },
            { img: dishRolls, title: "Signature Rolls", sub: "Hand-cut · Daily" },
          ]}
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mt-8 text-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 border-b border-primary pb-1 text-sm uppercase tracking-[0.28em] text-primary transition-all hover:gap-3"
            >
              See the full menu <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}