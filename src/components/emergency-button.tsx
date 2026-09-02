import { LifeBuoy } from "lucide-react";
import { whatsappLink } from "@/data/site";

export function EmergencyButton() {
  return (
    <a
      href={whatsappLink("EMERGENCY: I need immediate RideVibe support. My location: ")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 glow-pulse"
    >
      <LifeBuoy className="h-4 w-4" />
      <span className="hidden sm:inline">Emergency help</span>
    </a>
  );
}
