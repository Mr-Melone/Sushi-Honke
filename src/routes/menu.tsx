import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import dishAburi from "@/assets/dish-aburi.jpg";
import dishRamen from "@/assets/dish-ramen.jpg";
import dishKaraage from "@/assets/dish-karaage.jpg";
import dishGyoza from "@/assets/dish-gyoza.jpg";
import dishRolls from "@/assets/dish-rolls.jpg";
import dishSashimi from "@/assets/dish-sashimi.jpg";

export const Route = createFileRoute("/menu")({
  component: MenuPage,
  head: () => ({
    meta: [
      { title: "Menu — Sushi Honke Calamvale" },
      {
        name: "description",
        content:
          "Explore the Sushi Honke menu — sashimi, nigiri, rolls, ramen, rice bowls and sides, made fresh daily at Calamvale Central.",
      },
      { property: "og:title", content: "Menu — Sushi Honke Calamvale" },
      { property: "og:description", content: "Sashimi, nigiri, rolls, ramen and more — fresh every day." },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
});

const MENU_CATEGORIES = ["Signature", "Sashimi", "Nigiri", "Rolls", "Ramen", "Rice Bowls", "Sides"];

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

function MenuPage() {
  const [activeCat, setActiveCat] = useState("Signature");
  const filtered = MENU.filter((m) => m.category === activeCat);

  return (
    <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">— The Menu</p>
          <h1 className="font-display text-4xl font-light sm:text-5xl md:text-6xl">
            A taste of Japan, made fresh.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Prices in AUD. Menu updates seasonally — ask our team about specials on the day.
          </p>
        </div>

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
                  <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110" />
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
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.03]"
          >
            Order takeaway →
          </Link>
        </div>
      </div>
    </section>
  );
}