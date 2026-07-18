import { createFileRoute } from "@tanstack/react-router";
import dishSashimi from "@/assets/dish-sashimi.jpg";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Visit & Order — Sushi Honke Calamvale" },
      {
        name: "description",
        content:
          "Visit Sushi Honke at Calamvale Central — hours, location, parking and online ordering for takeaway and delivery.",
      },
      { property: "og:title", content: "Visit & Order — Sushi Honke" },
      { property: "og:description", content: "Hours, location and online ordering at Calamvale Central." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  return (
    <>
      <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">— Visit & Order</p>
            <h1 className="font-display text-4xl font-light sm:text-5xl md:text-6xl">
              Come say hello.
            </h1>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-12">
              <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">— Visit</p>
              <h2 className="font-display text-3xl font-light sm:text-4xl">Calamvale Central</h2>
              <p className="mt-3 text-muted-foreground">662 Compton Road, Calamvale QLD 4116</p>
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
                  <dd className="mt-1"><a href="tel:+61" className="hover:text-primary">(07) 3000 0000</a></dd>
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
                <a href="https://maps.google.com/?q=Sushi+Honke+Calamvale" target="_blank" rel="noreferrer" className="rounded-full border border-border px-5 py-2.5 text-sm uppercase tracking-widest transition-colors hover:border-foreground">
                  Get directions
                </a>
                <a href="tel:+61" className="rounded-full border border-border px-5 py-2.5 text-sm uppercase tracking-widest transition-colors hover:border-foreground">
                  Call us
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl">
              <img src={dishSashimi} alt="Fresh sashimi" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/60 to-background/90" />
              <div className="relative flex h-full flex-col justify-between p-8 sm:p-12">
                <div>
                  <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">— Order Online</p>
                  <h2 className="font-display text-4xl font-light leading-tight sm:text-5xl">
                    Fresh sushi,
                    <br />
                    <span className="italic text-primary">delivered</span> or ready to collect.
                  </h2>
                  <p className="mt-4 max-w-md text-muted-foreground">
                    Skip the queue. Order takeaway online or through your favourite delivery partner.
                  </p>
                </div>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a href="#" className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]">
                    Order Takeaway
                  </a>
                  <a href="https://www.ubereats.com/" target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center rounded-full border border-border bg-background/40 px-6 py-4 text-sm font-medium uppercase tracking-widest backdrop-blur-md transition-colors hover:bg-background/70">
                    Uber Eats
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-24 lg:pb-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.32em] text-primary">— FAQ</p>
            <h2 className="font-display text-4xl font-light sm:text-5xl">Good to know.</h2>
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
    </>
  );
}