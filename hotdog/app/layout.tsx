import type { Metadata, Viewport } from "next";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Lumina — AI Motion Studio",
  description:
    "Lumina turns a single sentence into a fully-graded cinematic shot. Camera, lighting and color science, generated in seconds.",
  metadataBase: new URL("https://lumina.studio"),
  openGraph: {
    title: "Lumina — AI Motion Studio",
    description: "Render the unfilmable. Cinematic AI video, generated in seconds.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#06070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-ink antialiased">
        {/* MotionConfig reducedMotion="user" makes every Framer animation honor
            the OS prefers-reduced-motion setting automatically. */}
        <MotionConfig reducedMotion="user">
          <ScrollProgress />
          <CustomCursor />
          <div className="grain" aria-hidden />
          <SmoothScroll>{children}</SmoothScroll>
        </MotionConfig>
      </body>
    </html>
  );
}
