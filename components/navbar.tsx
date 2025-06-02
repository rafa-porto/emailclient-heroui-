import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { MailIcon, ArrowRightIcon } from "lucide-react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export const Navbar = () => {
  return (
    <HeroUINavbar
      maxWidth="xl"
      position="fixed"
      className="backdrop-blur-md bg-background/60 border-b border-divider/50 z-50 py-3"
    >
      {/* Left side - Brand and Navigation */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-3" href="/">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
              <MailIcon size={18} />
            </div>
            <p className="font-bold text-lg text-inherit">{siteConfig.name}</p>
          </NextLink>
        </NavbarBrand>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-8 justify-start ml-12">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium text-default-600 hover:text-primary transition-colors font-medium"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Right side - Actions */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-3 items-center">
          {/* GitHub Link - Icon Only */}
          <a
            href="https://github.com/rafa-porto/emailclient-heroui-"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-default-100 dark:hover:bg-default-50 transition-colors"
            aria-label="GitHub Repository"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-default-600 hover:text-primary transition-colors"
            >
              <path
                d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2Z"
                fill="currentColor"
              />
            </svg>
          </a>

          <ThemeSwitch />

          <Button
            as={NextLink}
            href="/login"
            variant="light"
            className="font-medium px-4"
          >
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Navigation Menu */}
      <NavbarMenu>
        <div className="mx-4 mt-6 flex flex-col gap-4">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === siteConfig.navMenuItems.length - 1
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 2
                      ? "secondary"
                      : "foreground"
                }
                href={item.href}
                size="lg"
                className={
                  index === siteConfig.navMenuItems.length - 1
                    ? "font-medium"
                    : ""
                }
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}

          {/* GitHub link in mobile menu */}
          <NavbarMenuItem>
            <a
              href="https://github.com/rafa-porto/emailclient-heroui-"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-default-600 hover:text-primary transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2Z"
                  fill="currentColor"
                />
              </svg>
              <span>GitHub</span>
            </a>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
