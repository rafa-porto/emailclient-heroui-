import { type Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: "Login Success",
    template: `%s - ${siteConfig.name}`,
  },
  description: "Login successful, preparing your account.",
};

export default function LoginSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <section className="flex flex-1 items-center justify-center p-4">
        {children}
      </section>
    </div>
  );
}
