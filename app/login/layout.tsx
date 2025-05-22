"use client";

import { useTheme } from "next-themes";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const bgClass =
    theme === "dark"
      ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-black to-black"
      : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background";

  return (
    <section
      className={`flex flex-col items-center justify-center min-h-screen ${bgClass}`}
    >
      <div className="absolute inset-0 bg-grid-small-white/[0.2] dark:bg-grid-small-white/[0.05] -z-10" />
      {children}
    </section>
  );
}
