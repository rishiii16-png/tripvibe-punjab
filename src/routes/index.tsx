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

import { trips, vehicles, reviews } from "@/data/site";
import { Stars } from "@/components/stars";
import { useIntro } from "@/hooks/use-intro";

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

function CarWithFriends() {
  // 4 friends in the car, one waving out of the window
  const friends = [
    { x: 74, hair: "hsl(var(--foreground))", delay: "0ms" },
    { x: 106, hair: "hsl(var(--primary))", delay: "120ms" },
    { x: 140, hair: "hsl(var(--foreground))", delay: "240ms" },
    { x: 172, hair: "hsl(var(--primary))", delay: "60ms" },
  ];
  return (
    <svg
      viewBox="0 0 260 120"
      className="h-32 w-full"
      role="img"
      aria-label="A car full of friends driving off on a road trip"
    >
      {/* speed streaks */}
      {[30, 48, 66].map((y, i) => (
        <rect
          key={y}
          x="200"
          y={y}
          width="46"
          height="2"
          rx="1"
          className="speed-streak fill-primary/50"
          style={{ animationDelay: `${i * 140}ms` }}
        />
      ))}

      <g className="car-drive">
        <g className="car-bounce">
          {/* body */}
          <path
            d="M22 86 L30 62 Q34 52 46 52 L172 52 Q188 52 196 62 L212 78 Q220 80 220 88 L220 92 Q220 96 214 96 L28 96 Q22 96 22 92 Z"
            className="fill-primary"
          />
          {/* windows */}
          <path
            d="M50 60 L44 78 L108 78 L108 60 Z M116 60 L116 78 L186 78 L172 62 Q168 60 162 60 Z"
            className="fill-background/80"
          />
          {/* friends */}
          {friends.map((f) => (
            <g
              key={f.x}
              className="friend-bob"
              style={{ animationDelay: f.delay }}
            >
              <circle cx={f.x} cy={68} r="7" fill={f.hair} />
              <path
                d={`M${f.x - 8} 78 Q${f.x} 70 ${f.x + 8} 78 Z`}
                fill={f.hair}
                opacity="0.7"
              />
            </g>
          ))}
          {/* waving hand out of window */}
          <g style={{ transformOrigin: "96px 52px" }}>
            <rect
              x="92"
              y="34"
              width="6"
              height="20"
              rx="3"
              className="wave-hand fill-foreground"
            />
          </g>
          {/* headlight beam */}
          <path
            d="M220 80 L252 70 L252 94 L220 90 Z"
            className="fill-primary/30"
          />
          {/* wheels */}
          <g style={{ transformOrigin: "66px 96px" }}>
            <circle cx="66" cy="96" r="14" className="fill-foreground" />
            <g className="wheel-spin" style={{ transformOrigin: "66px 96px" }}>
              <rect x="64" y="84" width="4" height="24" className="fill-primary" />
              <rect x="54" y="94" width="24" height="4" className="fill-primary" />
            </g>
          </g>
          <g>
            <circle cx="186" cy="96" r="14" className="fill-foreground" />
            <g className="wheel-spin" style={{ transformOrigin: "186px 96px" }}>
              <rect x="184" y="84" width="4" height="24" className="fill-primary" />
              <rect x="174" y="94" width="24" height="4" className="fill-primary" />
            </g>
          </g>
          {/* roof luggage */}
          <rect x="82" y="44" width="48" height="9" rx="3" className="fill-foreground/80" />
          <rect x="94" y="38" width="24" height="7" rx="2" className="fill-primary/70" />
        </g>
      </g>
    </svg>
  );
}

function Loader() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-background">
      <div className="w-[22rem] max-w-[90vw]">
        <p className="text-center font-display text-3xl tracking-widest text-primary">
          RIDEVIBE
        </p>
        <CarWithFriends />
        <div className="h-px w-full road-lines" />
        <p className="mt-4 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Getting the squad in
        </p>
      </div>
    </div>
  );
}


function Home() {
  const [loading, setLoading] = useState(true);
  const { startIntro, endIntro } = useIntro();

  useEffect(() => {
    startIntro();
    const t = setTimeout(() => {
      setLoading(false);
      endIntro();
    }, 1300);
    return () => clearTimeout(t);
  }, [startIntro, endIntro]);

  return (
    <>
      {loading && <Loader />}

      {/* Hero — Mountain Glass: split layout, mist washes, featured trip card */}
      <section className="relative isolate overflow-hidden">
        {/* mist washes */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--glacial)_55%,transparent),transparent_65%)]" />
        <div className="absolute -left-24 top-8 -z-10 h-72 w-72 rounded-full bg-sage/25 blur-3xl" />
        <div className="absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-ember/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="rise inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              Punjab's student travel platform
            </span>
            <h1
              className="rise mt-6 text-6xl font-extrabold leading-[0.95] sm:text-7xl"
              style={{ animationDelay: "120ms" }}
            >
              Ride your{" "}
              <span className="text-gradient-ember italic">freedom</span>
            </h1>
            <p
              className="rise mt-5 max-w-md text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: "240ms" }}
            >
              Plan trips. Split costs. Travel with your vibe. Student-only rates on
              bikes, cars and buses — plus ready-made trips your whole hostel can join.
            </p>
            <div
              className="rise mt-8 flex flex-wrap gap-4"
              style={{ animationDelay: "360ms" }}
            >
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-transform hover:scale-105"
              >
                Book your ride <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/trips"
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-8 py-4 font-bold transition-colors hover:bg-secondary"
              >
                Trips from ₹899
              </Link>
            </div>
            <div
              className="rise mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8"
              style={{ animationDelay: "480ms" }}
            >
              {[
                ["1,400+", "student rides"],
                ["4.7★", "avg rating"],
                ["100%", "verified drivers"],
              ].map(([a, b]) => (
                <div key={b}>
                  <p className="font-display text-3xl font-bold text-primary">{a}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {b}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured trip visual */}
          <Link
            to="/trips"
            className="rise group relative block"
            style={{ animationDelay: "300ms" }}
          >
            <div className="relative aspect-square overflow-hidden rounded-[3rem] bg-primary shadow-2xl shadow-primary/30">
              <img
                src={trips[0].image}
                alt={trips[0].title}
                width={1024}
                height={768}
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--primary)_85%,transparent),transparent_55%)]" />
              <div className="absolute bottom-8 left-8 right-8 text-primary-foreground">
                <span className="mb-2 block text-xs uppercase tracking-widest opacity-80">
                  Featured trip
                </span>
                <h3 className="text-3xl">{trips[0].title}</h3>
                <p className="mt-1 text-sm opacity-90">
                  {trips[0].nights} · {trips[0].seatsLeft} seats left · ₹
                  {trips[0].perHead}/head
                </p>
              </div>
            </div>
            <div className="absolute -right-12 -top-12 -z-10 h-48 w-48 rounded-full bg-sage/40 blur-3xl" />
          </Link>
        </div>
      </section>

      {/* Why */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            The RideVibe advantage
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl">Not just a rental site</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            RideVibe is built only for students — pricing, groups and safety included.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
            ].map((f, i) => (
              <div
                key={f.title}
                className={
                  i === 1
                    ? "card-hover rounded-[2rem] bg-primary p-7 text-primary-foreground shadow-xl shadow-primary/25"
                    : "card-hover rounded-[2rem] border border-border bg-background p-7"
                }
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl ${
                    i === 1
                      ? "bg-primary-foreground/10"
                      : "bg-primary/10"
                  }`}
                >
                  <f.icon
                    className={`h-6 w-6 ${i === 1 ? "text-ember" : "text-primary"}`}
                  />
                </span>
                <h3 className="mt-4 text-2xl">{f.title}</h3>
                <p
                  className={`mt-2 text-sm ${
                    i === 1 ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  {f.body}
                </p>
              </div>
            ))}
          </div>
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
            ].map((c, i) => (
              <Link
                key={c.label}
                to="/vehicles"
                style={{ animationDelay: `${i * 110}ms` }}
                className="rise card-hover group relative isolate overflow-hidden rounded-[2rem] border border-border bg-card p-8 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[0_20px_50px_-20px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
              >
                {/* sheen sweep */}
                <span className="pointer-events-none absolute inset-y-0 -left-1/3 z-10 w-1/3 -skew-x-12 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--primary)_18%,transparent),transparent)] opacity-0 transition-none group-hover:opacity-100 group-hover:card-sheen" />
                {/* glow wash */}
                <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-center justify-between">
                  <c.icon className="h-9 w-9 text-primary transition-transform duration-500 ease-out group-hover:translate-x-1.5 group-hover:-rotate-3 group-hover:scale-110" />
                  <ArrowRight className="h-5 w-5 -translate-x-2 text-primary opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>

                <h3 className="mt-5 text-3xl">{c.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
                <p className="mt-4 font-display text-2xl">
                  From <span className="text-primary">₹{c.from}</span>
                  <span className="text-sm text-muted-foreground"> /day (student)</span>
                </p>

                {/* animated road underline */}
                <span className="pointer-events-none absolute inset-x-8 bottom-5 h-px scale-x-0 origin-left bg-primary/60 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="pointer-events-none absolute inset-x-8 bottom-5 h-px opacity-0 road-lines transition-opacity duration-500 group-hover:opacity-100" />
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
              className="card-hover group overflow-hidden rounded-3xl border border-border bg-card"
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

      {/* Reviews teaser — dark spruce panel */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="relative overflow-hidden rounded-[3rem] bg-primary px-6 py-16 sm:px-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-foreground/5 blur-3xl" />
          <div className="relative">
            <h2 className="text-4xl text-primary-foreground sm:text-5xl">
              Sirf students ke reviews
            </h2>
            <p className="mt-2 text-primary-foreground/70">
              Real trips. Real hostel stories.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {reviews.slice(0, 3).map((r) => (
                <div
                  key={r.id}
                  className="rounded-[2rem] border border-primary-foreground/15 bg-primary-foreground/10 p-6 backdrop-blur transition-transform duration-500 hover:-translate-y-1.5"
                >
                  <Stars value={r.rating} />
                  <p className="mt-3 text-sm text-primary-foreground/80">
                    "{r.text}"
                  </p>
                  <p className="mt-4 text-sm font-semibold text-primary-foreground">
                    {r.name}
                  </p>
                  <p className="text-xs text-primary-foreground/60">{r.college}</p>
                </div>
              ))}
            </div>
            <Link
              to="/reviews"
              className="mt-8 inline-flex rounded-2xl bg-primary-foreground px-5 py-3 text-sm font-bold text-primary transition-transform hover:scale-105"
            >
              Read all reviews &amp; add yours
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
