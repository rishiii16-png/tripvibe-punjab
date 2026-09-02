import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BadgePercent,
  Users,
  MapPinned,
  ShieldCheck,
  Bike,
  Car,
  Bus,
  ArrowRight,
} from "lucide-react";
import heroRoad from "@/assets/hero-road.jpg";
import { trips, vehicles, reviews } from "@/data/site";
import { Stars } from "@/components/stars";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RideVibe — Plan Trips. Split Costs. Travel With Your Vibe." },
      {
        name: "description",
        content:
          "Student-only pricing on cars, bikes and buses in Punjab, plus group trips to Kasol, Manali and Amritsar. Book online or on WhatsApp.",
      },
      {
        property: "og:title",
        content: "RideVibe — Student Travel Platform in Punjab",
      },
      {
        property: "og:description",
        content:
          "Student pricing, group trip matching, verified drivers and split-fare booking for college travel.",
      },
    ],
  }),
  component: Home,
});

function Loader() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-background">
      <div className="w-64">
        <p className="text-center font-display text-3xl tracking-widest text-primary">
          RIDEVIBE
        </p>
        <div className="relative mt-6 h-10">
          <Bike className="absolute top-0 h-8 w-8 text-foreground headlight" />
        </div>
        <div className="h-px w-full road-lines" />
        <p className="mt-4 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Starting engine
        </p>
      </div>
    </div>
  );
}

function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {loading && <Loader />}

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroRoad}
          alt="Bikes and cars on a Punjab highway at night with red light trails"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[image:var(--gradient-night)]" />
        <div className="absolute inset-x-0 bottom-24 h-px road-lines opacity-40" />
        <div className="relative mx-auto flex min-h-[86vh] max-w-6xl flex-col justify-center px-4 py-24">
          <span className="rise inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            For Punjab college students
          </span>
          <h1
            className="rise mt-6 max-w-3xl text-6xl leading-[0.95] sm:text-8xl"
            style={{ animationDelay: "120ms" }}
          >
            Ride your <span className="text-gradient-ember">freedom</span>
          </h1>
          <p
            className="rise mt-5 max-w-xl text-lg text-muted-foreground"
            style={{ animationDelay: "240ms" }}
          >
            Plan trips. Split costs. Travel with your vibe. Student-only rates on bikes,
            cars and buses — plus ready-made trips your whole hostel can join.
          </p>
          <div
            className="rise mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "360ms" }}
          >
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105 glow-pulse"
            >
              Book now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/trips"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/70 px-6 py-3 font-semibold backdrop-blur transition-colors hover:border-primary/60"
            >
              See trips from ₹899
            </Link>
          </div>
          <div
            className="rise mt-12 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4"
            style={{ animationDelay: "480ms" }}
          >
            {[
              ["1,400+", "student rides"],
              ["₹500–3000", "budget range"],
              ["4.7★", "avg rating"],
              ["100%", "verified drivers"],
            ].map(([a, b]) => (
              <div key={b}>
                <p className="font-display text-3xl text-primary">{a}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-4xl sm:text-5xl">Not just a rental site</h2>
        <p className="mt-2 max-w-xl text-muted-foreground">
          RideVibe is built only for students — pricing, groups and safety included.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: BadgePercent,
              title: "Student-only pricing",
              body: "Upload your college ID once, unlock up to 20% off every booking.",
            },
            {
              icon: Users,
              title: "Group trip matching",
              body: "Seat khali hai? Join another college group and split the fare.",
            },
            {
              icon: MapPinned,
              title: "Pre-planned trips",
              body: "Kasol, Manali, Amritsar — fixed price, fixed dates, zero planning.",
            },
            {
              icon: ShieldCheck,
              title: "Verified drivers",
              body: "Aadhaar + licence checked, live location share, SOS button.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="card-hover rounded-xl border border-border bg-card p-6"
            >
              <f.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-2xl">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vehicle categories */}
      <section className="border-y border-border/60 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl">Pick your ride</h2>
            <Link to="/vehicles" className="text-sm font-semibold text-primary">
              See all vehicles →
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: Bike, label: "Bike", from: 349, note: "Activa, Classic 350, Himalayan" },
              { icon: Car, label: "Car", from: 1799, note: "Dzire, Ertiga, Innova" },
              { icon: Bus, label: "Bus", from: 7499, note: "17 & 35 seaters for whole batch" },
            ].map((c) => (
              <Link
                key={c.label}
                to="/vehicles"
                className="card-hover group rounded-xl border border-border bg-card p-8"
              >
                <c.icon className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <h3 className="mt-5 text-3xl">{c.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
                <p className="mt-4 font-display text-2xl">
                  From <span className="text-primary">₹{c.from}</span>
                  <span className="text-sm text-muted-foreground"> /day (student)</span>
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            {vehicles.reduce((n, v) => n + v.available, 0)} vehicles available right now
            across Patiala, Ludhiana, Jalandhar &amp; Chandigarh.
          </p>
        </div>
      </section>

      {/* Trips teaser */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl sm:text-5xl">Trips leaving this week</h2>
          <Link to="/trips" className="text-sm font-semibold text-primary">
            All trips →
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {trips.map((t) => (
            <Link
              key={t.id}
              to="/trips"
              className="card-hover group overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={t.image}
                  alt={t.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
                  {t.seatsLeft} seats left
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-2xl">{t.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.nights}</p>
                <p className="mt-3 font-display text-2xl text-primary">
                  ₹{t.perHead}
                  <span className="text-sm text-muted-foreground"> /head</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews teaser */}
      <section className="border-t border-border/60 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-4xl sm:text-5xl">Sirf students ke reviews</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {reviews.slice(0, 3).map((r) => (
              <div
                key={r.id}
                className="card-hover rounded-xl border border-border bg-card p-6"
              >
                <Stars value={r.rating} />
                <p className="mt-3 text-sm text-muted-foreground">"{r.text}"</p>
                <p className="mt-4 text-sm font-semibold">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.college}</p>
              </div>
            ))}
          </div>
          <Link
            to="/reviews"
            className="mt-8 inline-flex rounded-md border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/60"
          >
            Read all reviews &amp; add yours
          </Link>
        </div>
      </section>
    </>
  );
}
