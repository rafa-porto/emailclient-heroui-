import { type Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Login Success - ${siteConfig.name}`,
  description: "Login successful. You're being redirected...",
};

export default function LoginSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="fixed inset-0 flex flex-col items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background dark:from-primary/20 dark:via-background dark:to-background">
      <div className="absolute inset-0 bg-grid-small-white/[0.2] dark:bg-grid-small-white/[0.05] -z-10" />
      <div className="w-full max-w-md p-4">{children}</div>
    </section>
  );
}
