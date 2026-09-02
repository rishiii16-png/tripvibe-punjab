import { Link } from "@tanstack/react-router";
import { whatsappLink } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-2xl">
            Ride<span className="text-primary">Vibe</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Plan trips. Split costs. Travel with your vibe. · Punjab &amp; Himachal
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link to="/vehicles" className="hover:text-foreground">
            Vehicles
          </Link>
          <Link to="/trips" className="hover:text-foreground">
            Trips
          </Link>
          <Link to="/reviews" className="hover:text-foreground">
            Reviews
          </Link>
          <a
            href={whatsappLink("Hi RideVibe!")}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} RideVibe · Verified drivers · Student-first pricing
      </div>
    </footer>
  );
}
