import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock, Check, Users } from "lucide-react";
import { trips, whatsappLink } from "@/data/site";

export const Route = createFileRoute("/trips")({
  head: () => ({
    meta: [
      { title: "College Trips — Kasol, Manali & Amritsar from ₹899 | RideVibe" },
      {
        name: "description",
        content:
          "Pre-planned student trip packages with fixed per-head pricing, group matching and split-fare payments. Seats update live.",
      },
      { property: "og:title", content: "RideVibe Trips — join a student group" },
      {
        property: "og:description",
        content:
          "Kasol ₹2499, Manali ₹3299, Amritsar ₹899 per head. Split the fare with your gang or join another college group.",
      },
    ],
  }),
  component: TripsPage,
});

function TripsPage() {
  const [group, setGroup] = useState(4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-5xl sm:text-6xl">Trips</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Fixed dates, fixed price per head. Apni gang lao ya doosre college ke group mein
        join kar lo — fare split automatically.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface p-5">
        <Users className="h-5 w-5 text-primary" />
        <span className="text-sm font-semibold">Split fare between</span>
        <input
          type="range"
          min={1}
          max={12}
          value={group}
          onChange={(e) => setGroup(Number(e.target.value))}
          className="w-48 accent-[oklch(0.58_0.23_27)]"
          aria-label="Number of friends"
        />
        <span className="font-display text-2xl text-primary">{group}</span>
        <span className="text-sm text-muted-foreground">
          friends — per-head totals update below
        </span>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {trips.map((t) => {
          const filled = Math.round(
            ((t.totalSeats - t.seatsLeft) / t.totalSeats) * 100,
          );
          return (
            <article
              key={t.id}
              className="card-hover group flex flex-col overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={t.image}
                  alt={t.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur">
                  {t.place}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-3xl">{t.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t.nights}</p>
                <p className="mt-3 text-sm italic text-muted-foreground">{t.vibe}</p>

                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  {t.includes.map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" /> {i}
                    </li>
                  ))}
                </ul>

                <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarClock className="h-4 w-4 text-primary/80" /> {t.departs}
                </p>

                <div className="mt-5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{t.seatsLeft} seats left</span>
                    <span>{filled}% booked</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-700"
                      style={{ width: `${filled}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <p className="font-display text-3xl text-primary">
                    ₹{t.perHead}
                    <span className="text-sm text-muted-foreground"> /head</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Group of {group} = ₹{(t.perHead * group).toLocaleString("en-IN")}{" "}
                    total
                  </p>
                </div>

                <div className="mt-5 flex gap-2">
                  <Link
                    to="/book"
                    search={{ trip: t.id }}
                    className="flex-1 rounded-md bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                  >
                    Book seats
                  </Link>
                  <a
                    href={whatsappLink(
                      `Hi RideVibe! I want to join the ${t.title} group trip.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary/60"
                  >
                    Join group
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
