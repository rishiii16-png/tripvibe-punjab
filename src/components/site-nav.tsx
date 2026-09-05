import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { whatsappLink } from "@/data/site";
import { BrandLogo } from "@/components/brand-logo";
import { useIntro } from "@/hooks/use-intro";
import { useTheme } from "@/hooks/use-theme";


const links = [
  { to: "/", label: "Home" },
  { to: "/vehicles", label: "Vehicles" },
  { to: "/trips", label: "Trips" },
  { to: "/reviews", label: "Reviews" },
  { to: "/book", label: "Book" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { isIntroLoading } = useIntro();

  return (
    <header className="sticky top-3 z-50 px-4">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border border-border/70 bg-card/70 px-5 shadow-sm backdrop-blur-xl">
        <Link
          to="/"
          aria-label="RideVibe home"
          className={`transition-opacity duration-500 ${isIntroLoading ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          <BrandLogo />
        </Link>


        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={whatsappLink("Hi RideVibe! I want to book a ride.")}
            target="_blank"
            rel="noreferrer"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-transform hover:scale-105"
          >
            <Phone className="h-4 w-4" /> WhatsApp
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="mx-auto mt-2 max-w-6xl rounded-2xl border border-border/70 bg-card/95 px-4 py-3 shadow-lg backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="block rounded-md px-2 py-3 text-sm font-medium text-muted-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
