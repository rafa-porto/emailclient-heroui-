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
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-default-50 to-default-100 dark:from-default-900 dark:to-default-950 overflow-hidden">
      <div className="w-full max-w-md p-4">{children}</div>
    </div>
  );
}
