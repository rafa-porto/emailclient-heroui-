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
      className="backdrop-blur-md bg-background/60 shadow-sm border-b border-divider z-50 py-2"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              <MailIcon size={20} />
            </div>
            <p className="font-bold text-xl text-inherit">{siteConfig.name}</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-6 justify-start ml-10">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium text-default-600 hover:text-primary transition-colors"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-4 items-center">
          <ThemeSwitch />
          <Button
            as={NextLink}
            href="/login"
            variant="light"
            className="font-medium"
          >
            Login
          </Button>
          <HoverBorderGradient
            containerClassName="rounded-full"
            className="bg-primary text-white flex items-center space-x-2"
            as={Button}
            variant="solid"
            size="md"
          >
            <span>Get Started</span>
            <ArrowRightIcon size={16} className="ml-1" />
          </HoverBorderGradient>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

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
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
