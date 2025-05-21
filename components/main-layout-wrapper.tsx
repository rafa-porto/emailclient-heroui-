"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Link } from "@heroui/link"; // Mantendo o import original de app/layout.tsx
import { siteConfig } from "@/config/site";

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");

  if (isDashboardRoute) {
    // Para rotas do dashboard, renderiza os filhos diretamente.
    // O layout próprio do dashboard (app/dashboard/layout.tsx) fornecerá sua estrutura.
    return <>{children}</>;
  }

  // Para rotas não relacionadas ao dashboard, renderiza com Navbar, área de conteúdo principal e Footer.
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href={siteConfig.links.github}
          title="nextui.org homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">NextUI</p>
        </Link>
      </footer>
    </div>
  );
}
