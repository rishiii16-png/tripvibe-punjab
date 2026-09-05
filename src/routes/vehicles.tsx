import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bike, Car, Bus, Fuel, Users, CircleDot } from "lucide-react";
import { vehicles, whatsappLink, type VehicleType } from "@/data/site";
import { Stars } from "@/components/stars";

export const Route = createFileRoute("/vehicles")({
  head: () => ({
    meta: [
      { title: "Vehicles — Student Rates on Bikes, Cars & Buses | RideVibe" },
      {
        name: "description",
        content:
          "Compare bikes, cars and buses with clear per-day pricing, fuel policy, self-drive or driver options and live availability.",
      },
      { property: "og:title", content: "RideVibe Vehicles — clear student pricing" },
      {
        property: "og:description",
        content:
          "Activa from ₹349/day, Dzire from ₹1799/day, 17-seaters from ₹7499/day. Student ID discount applied.",
      },
    ],
  }),
  component: VehiclesPage,
});

const filters: ("All" | VehicleType)[] = ["All", "Bike", "Car", "Bus"];
const icons = { Bike, Car, Bus } as const;

function VehiclesPage() {
  const [filter, setFilter] = useState<"All" | VehicleType>("All");
  const [student, setStudent] = useState(true);

  const list = useMemo(
    () => (filter === "All" ? vehicles : vehicles.filter((v) => v.type === filter)),
    [filter],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-5xl sm:text-6xl">Vehicles</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Saaf pricing, no hidden charges. Availability updates live across Patiala,
        Ludhiana, Jalandhar and Chandigarh.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
        <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={student}
            onChange={(e) => setStudent(e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          Show student ID price
        </label>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((v) => {
          const Icon = icons[v.type];
          const price = student ? v.studentPrice : v.pricePerDay;
          return (
            <article
              key={v.id}
              className="card-hover flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between">
                <Icon className="h-7 w-7 text-primary" />
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    v.available > 2
                      ? "bg-success/15 text-success"
                      : "bg-primary/15 text-primary"
                  }`}
                >
                  <CircleDot className="h-3 w-3" />
                  {v.available > 0 ? `${v.available} available` : "Sold out"}
                </span>
              </div>

              <h2 className="mt-4 text-2xl">{v.name}</h2>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <Stars value={v.rating} size={13} />
                {v.rating} · {v.trips} student trips
              </div>

              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary/80" /> {v.seats} seats
                </li>
                <li className="flex items-center gap-2">
                  <Fuel className="h-4 w-4 text-primary/80" /> {v.fuelPolicy}
                </li>
                <li className="flex flex-wrap gap-2 pt-1">
                  {v.driveOptions.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-border px-2.5 py-0.5 text-xs"
                    >
                      {d}
                    </span>
                  ))}
                </li>
              </ul>

              <div className="mt-5 flex items-end gap-2">
                <p className="font-display text-3xl text-primary">₹{price}</p>
                <span className="pb-1 text-sm text-muted-foreground">/ day</span>
                {student && (
                  <span className="pb-1 text-sm text-muted-foreground line-through">
                    ₹{v.pricePerDay}
                  </span>
                )}
              </div>

              <div className="mt-5 flex gap-2">
                <Link
                  to="/book"
                  search={{ vehicle: v.id }}
                  className="flex-1 rounded-md bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                >
                  Book now
                </Link>
                <a
                  href={whatsappLink(`Hi RideVibe! Is the ${v.name} available?`)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary/60"
                >
                  WhatsApp
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
