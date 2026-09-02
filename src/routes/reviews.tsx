import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Star, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { reviews as seedReviews, type Review } from "@/data/site";
import { Stars } from "@/components/stars";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Student Reviews — Real Trip Feedback | RideVibe" },
      {
        name: "description",
        content:
          "Verified ratings, photos and honest feedback from Punjab college students who booked rides and trips with RideVibe.",
      },
      { property: "og:title", content: "RideVibe Reviews — only from students" },
      {
        property: "og:description",
        content:
          "4.7 average across 1,400+ student rides. Read reviews and share your own trip experience.",
      },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const [list, setList] = useState<(Review & { photo?: string | undefined })[]>(seedReviews);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [trip, setTrip] = useState("");
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState<string | undefined>();

  const avg = useMemo(
    () => (list.reduce((n, r) => n + r.rating, 0) / list.length).toFixed(1),
    [list],
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !text) {
      toast.error("Naam aur review dono chahiye 🙂");
      return;
    }
    setList((prev) => [
      {
        id: crypto.randomUUID(),
        name,
        college: college || "Punjab",
        rating,
        text,
        trip: trip || "RideVibe trip",
        date: "Just now",
        photo,
      },
      ...prev,
    ]);
    setName("");
    setCollege("");
    setTrip("");
    setText("");
    setPhoto(undefined);
    setRating(5);
    toast.success("Review posted! Thanks for helping other students 🙌");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-5xl sm:text-6xl">Reviews</h1>
      <div className="mt-3 flex items-center gap-3">
        <Stars value={Number(avg)} size={20} />
        <span className="font-display text-3xl text-primary">{avg}</span>
        <span className="text-sm text-muted-foreground">
          from {list.length} student reviews
        </span>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4 sm:grid-cols-2">
          {list.map((r) => (
            <article
              key={r.id}
              className="card-hover rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <Stars value={r.rating} />
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">"{r.text}"</p>
              {r.photo && (
                <img
                  src={r.photo}
                  alt="Trip photo shared by student"
                  loading="lazy"
                  className="mt-4 h-40 w-full rounded-lg object-cover"
                />
              )}
              <div className="mt-4 border-t border-border pt-3">
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-xs text-muted-foreground">
                  {r.college} · {r.trip}
                </p>
              </div>
            </article>
          ))}
        </div>

        <form
          onSubmit={submit}
          className="h-fit rounded-xl border border-border bg-surface p-6 lg:sticky lg:top-24"
        >
          <h2 className="text-3xl">Rate your trip</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sirf verified students. 30 seconds lagenge.
          </p>

          <div className="mt-5 flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(0)}
                aria-label={`${i} star`}
              >
                <Star
                  className={`h-7 w-7 transition-transform hover:scale-110 ${
                    i <= (hover || rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/40"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            <input
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="College (e.g. Thapar, Patiala)"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            <input
              value={trip}
              onChange={(e) => setTrip(e.target.value)}
              placeholder="Which ride / trip?"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Short review — vehicle condition, driver, pricing…"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border px-3 py-3 text-sm text-muted-foreground hover:border-primary/60">
              <ImagePlus className="h-4 w-4 text-primary" />
              {photo ? "Photo added ✓" : "Add a trip photo (optional)"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setPhoto(URL.createObjectURL(f));
                }}
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-5 w-full rounded-md bg-primary px-4 py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Post review
          </button>
        </form>
      </div>
    </div>
  );
}
