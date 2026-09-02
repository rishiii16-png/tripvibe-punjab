import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { trips, vehicles, whatsappLink } from "@/data/site";

const searchSchema = z.object({
  vehicle: z.string().optional(),
  trip: z.string().optional(),
});

export const Route = createFileRoute("/book")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Book a Ride or Trip — Split the Fare | RideVibe" },
      {
        name: "description",
        content:
          "Direct booking for bikes, cars, buses and student trip packages. See the exact total, split it with friends, confirm on WhatsApp.",
      },
      { property: "og:title", content: "Book with RideVibe" },
      {
        property: "og:description",
        content:
          "Pick a vehicle or trip, choose days, apply your student ID discount and split the fare instantly.",
      },
    ],
  }),
  component: BookPage,
});

type Mode = "vehicle" | "trip";

function BookPage() {
  const search = Route.useSearch();
  const [mode, setMode] = useState<Mode>(search.trip ? "trip" : "vehicle");
  const [vehicleId, setVehicleId] = useState(search.vehicle ?? vehicles[0]!.id);
  const [tripId, setTripId] = useState(search.trip ?? trips[0]!.id);
  const [days, setDays] = useState(2);
  const [people, setPeople] = useState(4);
  const [drive, setDrive] = useState("Self-drive");
  const [student, setStudent] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [date, setDate] = useState("");
  const [pickup, setPickup] = useState("Patiala");
  const [done, setDone] = useState(false);

  const vehicle = vehicles.find((v) => v.id === vehicleId)!;
  const trip = trips.find((t) => t.id === tripId)!;

  const total = useMemo(() => {
    if (mode === "trip") return trip.perHead * people;
    const base = (student ? vehicle.studentPrice : vehicle.pricePerDay) * days;
    return drive === "With driver" ? base + 800 * days : base;
  }, [mode, trip, people, student, vehicle, days, drive]);

  const summary =
    mode === "trip"
      ? `${trip.title} · ${people} seats · ${trip.nights}`
      : `${vehicle.name} · ${days} day(s) · ${drive}`;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone) {
      toast.error("Naam aur phone number zaroori hai.");
      return;
    }
    setDone(true);
    toast.success("Booking request sent! We'll confirm within 10 minutes.");
  }

  const waMessage = `Hi RideVibe! Booking request:
${summary}
Name: ${name || "-"} (${college || "student"})
Phone: ${phone || "-"}
Date: ${date || "-"} | Pickup: ${pickup}
Total: ₹${total.toLocaleString("en-IN")}${
    mode === "trip" || people > 1
      ? ` (₹${Math.ceil(total / people).toLocaleString("en-IN")} per head)`
      : ""
  }`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-5xl sm:text-6xl">Book your ride</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Direct booking — koi "contact me and wait" nahi. Confirm on the site, get the
        driver details on WhatsApp.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form onSubmit={submit} className="rounded-xl border border-border bg-card p-6">
          <div className="flex gap-2">
            {(["vehicle", "trip"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 rounded-md border px-4 py-2.5 text-sm font-semibold capitalize transition-colors ${
                  mode === m
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-muted-foreground"
                }`}
              >
                {m === "vehicle" ? "Rent a vehicle" : "Join a trip"}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {mode === "vehicle" ? (
              <>
                <Field label="Vehicle">
                  <select
                    value={vehicleId}
                    onChange={(e) => {
                      setVehicleId(e.target.value);
                      const v = vehicles.find((x) => x.id === e.target.value)!;
                      setDrive(v.driveOptions[0] ?? "Self-drive");
                    }}
                    className={inputCls}
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.type} · {v.name} · ₹{v.studentPrice}/day
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Driver option">
                  <select
                    value={drive}
                    onChange={(e) => setDrive(e.target.value)}
                    className={inputCls}
                  >
                    {vehicle.driveOptions.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Days">
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={days}
                    onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
                    className={inputCls}
                  />
                </Field>
              </>
            ) : (
              <>
                <Field label="Trip package">
                  <select
                    value={tripId}
                    onChange={(e) => setTripId(e.target.value)}
                    className={inputCls}
                  >
                    {trips.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title} · ₹{t.perHead}/head
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Departure">
                  <input readOnly value={trip.departs} className={inputCls} />
                </Field>
              </>
            )}

            <Field label={mode === "trip" ? "Seats" : "Splitting between"}>
              <input
                type="number"
                min={1}
                max={35}
                value={people}
                onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))}
                className={inputCls}
              />
            </Field>
            <Field label="Start date">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Pickup city">
              <select
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className={inputCls}
              >
                {["Patiala", "Ludhiana", "Jalandhar", "Chandigarh", "Amritsar"].map(
                  (c) => (
                    <option key={c}>{c}</option>
                  ),
                )}
              </select>
            </Field>
            <Field label="Your name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Simran Kaur"
                className={inputCls}
              />
            </Field>
            <Field label="Phone (WhatsApp)">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98xxxxxxxx"
                className={inputCls}
              />
            </Field>
            <Field label="College">
              <input
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="Thapar, Patiala"
                className={inputCls}
              />
            </Field>
          </div>

          {mode === "vehicle" && (
            <label className="mt-5 flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={student}
                onChange={(e) => setStudent(e.target.checked)}
                className="h-4 w-4 accent-[oklch(0.58_0.23_27)]"
              />
              I have a valid college ID (apply student discount — show ID at pickup)
            </label>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105 glow-pulse"
            >
              Confirm booking
            </button>
            <a
              href={whatsappLink(waMessage)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 font-semibold transition-colors hover:border-primary/60"
            >
              <MessageCircle className="h-4 w-4" /> Book on WhatsApp
            </a>
          </div>

          {done && (
            <div className="mt-6 flex items-start gap-3 rounded-lg border border-success/40 bg-success/10 p-4 text-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" />
              <div>
                <p className="font-semibold">Request received, {name}!</p>
                <p className="text-muted-foreground">
                  {summary} — we'll WhatsApp you the driver + vehicle details within 10
                  minutes.
                </p>
              </div>
            </div>
          )}
        </form>

        <aside className="h-fit rounded-xl border border-border bg-surface p-6 lg:sticky lg:top-24">
          <h2 className="text-3xl">Fare summary</h2>
          <p className="mt-1 text-sm text-muted-foreground">{summary}</p>

          <div className="mt-5 space-y-2 text-sm">
            <Row label={mode === "trip" ? "Per head" : "Base per day"}>
              ₹
              {(mode === "trip"
                ? trip.perHead
                : student
                  ? vehicle.studentPrice
                  : vehicle.pricePerDay
              ).toLocaleString("en-IN")}
            </Row>
            {mode === "vehicle" && drive === "With driver" && (
              <Row label="Driver charge / day">₹800</Row>
            )}
            <Row label={mode === "trip" ? "Seats" : "Days"}>
              {mode === "trip" ? people : days}
            </Row>
            {mode === "vehicle" && student && (
              <Row label="Student discount">
                <span className="text-success">
                  −₹
                  {((vehicle.pricePerDay - vehicle.studentPrice) * days).toLocaleString(
                    "en-IN",
                  )}
                </span>
              </Row>
            )}
          </div>

          <div className="mt-5 border-t border-border pt-5">
            <p className="font-display text-4xl text-primary">
              ₹{total.toLocaleString("en-IN")}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary/80" />
              ₹{Math.ceil(total / people).toLocaleString("en-IN")} each when split between{" "}
              {people}
            </p>
          </div>

          <div className="mt-6 space-y-2 text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> Verified driver &amp;
              vehicle papers
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> Free cancellation up to 24
              hrs before
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" /> 24×7 emergency support
              button
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{children}</span>
    </div>
  );
}
