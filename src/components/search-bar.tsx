import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Bike, Bus, Car, MapPin, Search, TentTree } from "lucide-react";
import { cities, trips, vehicles, type VehicleType } from "@/data/site";

type Suggestion =
  | { kind: "city"; city: string; colleges: string }
  | { kind: "vehicle"; id: string; name: string; type: VehicleType; price: number; city: string }
  | { kind: "trip"; id: string; title: string; perHead: number };

const typeIcon: Record<VehicleType, typeof Car> = { Car, Bike, Bus };

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const suggestions = useMemo<Suggestion[]>(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];

    const matchedCities = cities.filter(
      (c) => c.name.toLowerCase().includes(q) || c.colleges.toLowerCase().includes(q),
    );

    const out: Suggestion[] = [];
    for (const c of matchedCities.slice(0, 3)) {
      out.push({ kind: "city", city: c.name, colleges: c.colleges });
      // for each matched city, suggest one vehicle of each type available there
      for (const type of ["Car", "Bike", "Bus"] as VehicleType[]) {
        const v = vehicles.find((x) => x.type === type);
        if (v) {
          out.push({
            kind: "vehicle",
            id: v.id,
            name: v.name,
            type,
            price: v.studentPrice,
            city: c.name,
          });
        }
      }
    }

    const matchedTrips = trips.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.place.toLowerCase().includes(q) ||
        t.departs.toLowerCase().includes(q),
    );
    for (const t of matchedTrips.slice(0, 2)) {
      out.push({ kind: "trip", id: t.id, title: t.title, perHead: t.perHead });
    }

    return out.slice(0, 10);
  }, [query]);

  useEffect(() => {
    setHighlight(0);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function pick(s: Suggestion) {
    setOpen(false);
    setQuery("");
    if (s.kind === "city") {
      navigate({ to: "/vehicles" });
    } else if (s.kind === "vehicle") {
      navigate({ to: "/book", search: { vehicle: s.id } });
    } else {
      navigate({ to: "/book", search: { trip: s.id } });
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      pick(suggestions[highlight]!);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={boxRef} className="relative w-full max-w-xl">
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-lg shadow-primary/10 backdrop-blur-xl transition-colors focus-within:border-primary/60">
        <Search className="h-5 w-5 shrink-0 text-primary" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Try your city — Jalandhar, Patiala, Ludhiana…"
          aria-label="Search your city, vehicle or trip"
          className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
        />
      </div>

      {open && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/15 backdrop-blur-xl">
          {suggestions.length === 0 ? (
            <p className="px-5 py-4 text-sm text-muted-foreground">
              Kuch nahi mila — try Patiala, Jalandhar, Kasol, bike…
            </p>
          ) : (
            <ul role="listbox">
              {suggestions.map((s, i) => {
                const active = i === highlight;
                const base = `flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition-colors ${
                  active ? "bg-primary/10" : "hover:bg-surface"
                }`;
                if (s.kind === "city") {
                  return (
                    <li key={`c-${s.city}`}>
                      <button
                        type="button"
                        onClick={() => pick(s)}
                        onMouseEnter={() => setHighlight(i)}
                        className={base}
                      >
                        <MapPin className="h-4 w-4 shrink-0 text-ember" />
                        <span>
                          <span className="font-bold">{s.city}</span>
                          <span className="block text-xs text-muted-foreground">
                            {s.colleges} · all vehicles available
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                }
                if (s.kind === "vehicle") {
                  const Icon = typeIcon[s.type];
                  return (
                    <li key={`v-${s.type}-${s.city}`}>
                      <button
                        type="button"
                        onClick={() => pick(s)}
                        onMouseEnter={() => setHighlight(i)}
                        className={base}
                      >
                        <Icon className="h-4 w-4 shrink-0 text-primary" />
                        <span className="flex-1">
                          <span className="font-semibold">
                            {s.type} in {s.city}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {s.name} · from ₹{s.price}/day student rate
                          </span>
                        </span>
                        <span className="text-xs font-bold text-primary">Book →</span>
                      </button>
                    </li>
                  );
                }
                return (
                  <li key={`t-${s.id}`}>
                    <button
                      type="button"
                      onClick={() => pick(s)}
                      onMouseEnter={() => setHighlight(i)}
                      className={base}
                    >
                      <TentTree className="h-4 w-4 shrink-0 text-ember" />
                      <span className="flex-1">
                        <span className="font-semibold">{s.title}</span>
                        <span className="block text-xs text-muted-foreground">
                          Group trip · ₹{s.perHead}/head
                        </span>
                      </span>
                      <span className="text-xs font-bold text-primary">Join →</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
