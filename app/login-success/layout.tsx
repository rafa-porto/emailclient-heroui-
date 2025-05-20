import { type Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: "Login Realizado",
    template: `%s - ${siteConfig.name}`,
  },
  description: "Login realizado com sucesso, preparando sua conta.",
};

export default function LoginSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-default-50 to-default-100 dark:from-default-900 dark:to-default-950">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
