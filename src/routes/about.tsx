import { createFileRoute } from "@tanstack/react-router";
import dishSashimi from "@/assets/dish-sashimi.jpg";
import dishAburi from "@/assets/dish-aburi.jpg";
import dishRolls from "@/assets/dish-rolls.jpg";
import dishRamen from "@/assets/dish-ramen.jpg";
import galleryChef from "@/assets/gallery-chef.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Sushi Honke Calamvale" },
      {
        name: "description",
        content:
          "A neighbourhood sushi destination at Calamvale Central — warm, modern Japanese dining with a traditional sushi bar and open kitchen.",
      },
      { property: "og:title", content: "About Sushi Honke" },
      { property: "og:description", content: "A neighbourhood sushi destination at Calamvale Central." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const REVIEWS = [
  { text: "The freshest sushi in Brisbane south. Aburi salmon is unreal — worth the drive every single time.", name: "Emily R.", source: "Google Review" },
  { text: "A neighbourhood gem. Sushi train keeps the kids busy while we enjoy sashimi and ramen. Consistently excellent.", name: "Daniel K.", source: "Google Review" },
  { text: "Beautiful presentation, warm service, and the tonkotsu ramen is deeply comforting. Our new local.", name: "Priya S.", source: "Google Review" },
  { text: "Fresh, generous portions, and priced fairly. Easy takeaway too. Highly recommend.", name: "Marcus T.", source: "Google Review" },
];

const GALLERY = [
  { src: dishSashimi, alt: "Fresh sashimi platter" },
  { src: galleryChef, alt: "Chef preparing nigiri" },
  { src: dishRolls, alt: "Signature sushi rolls" },
  { src: galleryInterior, alt: "Restaurant interior" },
  { src: dishAburi, alt: "Aburi salmon nigiri" },
  { src: dishRamen, alt: "Tonkotsu ramen" },
];

function AboutPage() {
  return (
    <>
      <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl">
              <img src={galleryInterior} alt="Sushi Honke interior" loading="lazy" className="h-full w-full object-cover" />
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
            <h1 className="font-display text-4xl font-light leading-tight sm:text-5xl">
              A neighbourhood
              <br />
              sushi destination.
            </h1>
            <p className="mt-6 text-muted-foreground">
              Tucked inside Calamvale Central, Sushi Honke brings a warm, modern take on traditional Japanese dining. Watch our chefs work behind the sushi bar, pick your favourites from the sushi train, or settle in for a bowl of steaming ramen.
            </p>
            <p className="mt-4 text-muted-foreground">
              Whether it's a quick weekday lunch, a family dinner or a date night, we've built a space that feels equal parts refined and relaxed — with food that lets the ingredients speak.
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

      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">— Gallery</p>
              <h2 className="font-display text-4xl font-light sm:text-5xl">
                Moments from the restaurant.
              </h2>
            </div>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="text-sm uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-primary">
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
                <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-card py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">— Reviews</p>
            <h2 className="font-display text-4xl font-light sm:text-5xl">Loved by locals.</h2>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span style={{ color: "var(--gold)" }}>★★★★★</span>
              <span>Rated by hundreds on Google</span>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="flex h-full flex-col justify-between rounded-2xl border border-border bg-background p-8">
                <div>
                  <div className="mb-4 text-primary">★★★★★</div>
                  <blockquote className="text-sm leading-relaxed text-foreground">"{r.text}"</blockquote>
                </div>
                <figcaption className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
                  {r.name} · {r.source}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}