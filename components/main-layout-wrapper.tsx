"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Link } from "@heroui/link"; // Mantendo o import original de app/layout.tsx
import { MailIcon } from "lucide-react";
import { siteConfig } from "@/config/site";

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isLoginRoute = pathname.startsWith("/login");

  // Para rotas do dashboard ou login, renderiza os filhos diretamente sem header/footer
  if (isDashboardRoute || isLoginRoute) {
    return <>{children}</>;
  }

  // Para rotas não relacionadas ao dashboard, renderiza com Navbar, área de conteúdo principal e Footer.
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      {/* Removendo o container para permitir seções de largura total */}
      <main className="w-full pt-16 flex-grow">{children}</main>
      <footer className="w-full bg-background py-12 border-t border-divider">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                  <MailIcon size={16} />
                </div>
                <span className="font-bold">{siteConfig.name}</span>
              </div>
              <p className="text-default-600 text-sm">
                Modern email client for all your communication needs
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-default-600 hover:text-primary text-sm"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-default-600 hover:text-primary text-sm"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-default-600 hover:text-primary text-sm"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-default-600 hover:text-primary text-sm"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-default-600 hover:text-primary text-sm"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="text-default-600 hover:text-primary text-sm"
                  >
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-default-600 hover:text-primary text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-default-600 hover:text-primary text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-divider mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-default-500 text-sm">
              © 2023 Dove Mail. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                href={siteConfig.links.twitter}
                className="text-default-500 hover:text-primary"
              >
                Twitter
              </Link>
              <Link
                href={siteConfig.links.github}
                className="text-default-500 hover:text-primary"
              >
                GitHub
              </Link>
              <Link
                href={siteConfig.links.discord}
                className="text-default-500 hover:text-primary"
              >
                Discord
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
