"use client";

import React, { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, CheckIcon, LockIcon, MailIcon } from "lucide-react";

import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";

import { subtitle, title } from "@/components/primitives";
import { AppleIcon, GmailIcon, OutlookIcon } from "@/components/icons";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailConnect = (service: string) => {
    setIsLoading(service);

    // Simulate connection process
    setTimeout(() => {
      setIsLoading(null);
      // Redirect to the specific success page based on the provider
      switch (service) {
        case "gmail":
          router.push("/login-success/gmail");
          break;
        case "outlook":
          router.push("/login-success/outlook");
          break;
        case "apple":
          router.push("/login-success/apple");
          break;
        default:
          router.push("/login-success");
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="absolute top-6 left-6 z-10">
        <NextLink
          className="flex items-center gap-2 text-default-600 hover:text-primary transition-colors"
          href="/"
        >
          <ArrowLeftIcon size={18} />
          <span>Back to Home</span>
        </NextLink>
      </div>

      <div className="w-full max-w-7xl px-6 py-8 md:py-0 flex flex-col md:flex-row items-center justify-center md:items-center gap-12 md:gap-20">
        {/* Left Column - Hero Text */}
        <div className="w-full md:w-1/2 max-w-md md:max-w-none md:pt-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
              <MailIcon size={20} />
            </div>
            <h2 className="text-2xl font-bold">Dove Mail</h2>
          </div>

          <h1 className={title({ color: "blue", size: "md" })}>Welcome Back</h1>
          <p className={subtitle({ class: "mt-4 text-lg" })}>
            Sign in to your account to access your emails, contacts, and
            settings.
          </p>

          <div className="mt-8 space-y-4 hidden md:block">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                <CheckIcon className="text-primary" size={16} />
              </div>
              <div>
                <h3 className="font-medium">Secure Authentication</h3>
                <p className="text-default-600 text-sm">
                  Your data is protected with end-to-end encryption
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                <CheckIcon className="text-primary" size={16} />
              </div>
              <div>
                <h3 className="font-medium">Multiple Providers</h3>
                <p className="text-default-600 text-sm">
                  Connect with Gmail, Outlook, or Apple Mail
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Login Card */}
        <div className="w-full md:w-1/2 max-w-md">
          <Card className="border-none shadow-2xl bg-background/90 dark:bg-background/80 backdrop-blur-md backdrop-saturate-150 rounded-xl overflow-hidden border border-divider/30">
            <CardHeader className="flex flex-col items-center justify-center text-center p-8 pb-6 border-b border-divider/50">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <LockIcon className="text-primary" size={24} />
              </div>
              <h2 className="text-2xl font-semibold">
                Sign in to your account
              </h2>
              <p className="text-default-600 mt-2">
                Choose your email provider to continue
              </p>
            </CardHeader>

            <CardBody className="px-8 py-6 gap-4">
              <Button
                className="w-full font-medium text-default-700 dark:text-default-200 bg-white dark:bg-black"
                isLoading={isLoading === "gmail"}
                radius="lg"
                size="lg"
                startContent={<GmailIcon className="h-5 w-5" />}
                variant="flat"
                onPress={() => handleEmailConnect("gmail")}
              >
                Continue with Gmail
              </Button>

              <Button
                className="w-full font-medium text-default-700 dark:text-default-200 bg-white dark:bg-black"
                isLoading={isLoading === "outlook"}
                radius="lg"
                size="lg"
                startContent={<OutlookIcon className="h-5 w-5" />}
                variant="flat"
                onPress={() => handleEmailConnect("outlook")}
              >
                Continue with Outlook
              </Button>

              <Button
                className="w-full font-medium text-default-700 dark:text-default-200 bg-white dark:bg-black"
                isLoading={isLoading === "apple"}
                radius="lg"
                size="lg"
                startContent={<AppleIcon className="h-5 w-5" />}
                variant="flat"
                onPress={() => handleEmailConnect("apple")}
              >
                Continue with Apple Mail
              </Button>

              <div className="relative flex items-center mt-2 mb-2">
                <div className="flex-grow border-t border-divider" />
                <span className="flex-shrink mx-4 text-default-500 text-sm">
                  or
                </span>
                <div className="flex-grow border-t border-divider" />
              </div>

              <Button
                as={NextLink}
                className="w-full font-medium"
                href="/login-form"
                radius="lg"
                size="lg"
                variant="bordered"
              >
                Sign in with Email and Password
              </Button>
            </CardBody>

            <CardFooter className="px-8 py-6 flex flex-col items-center justify-center border-t border-divider">
              <p className="text-default-600 text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  as={NextLink}
                  className="font-medium"
                  color="primary"
                  href="/signup"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
