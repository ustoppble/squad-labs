// Single source of truth for GSAP + ScrollTrigger.
// Registering the plugin once here avoids double-registration warnings and
// guarantees every consumer shares the same gsap instance/ticker.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
